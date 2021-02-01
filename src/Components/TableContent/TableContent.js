import React, { useState } from "react";
import TableHeader from "./TableHeader";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableContainer,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";

import CellFont from '../CellFont/CellFont'
import { StarBorder } from "@material-ui/icons";

const rowInformation = [
  { name: "bobo", price: 20, rank: 1 },
  { name: "alice", price: 241, rank: 2 },
  { name: "kriran", price: 25, rank: 4 },
  { name: "william", price: 30, rank: 3 },
];
const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const sortedRowInformation = (rowArray, compatator) => {
  const stabilizedRowAray = rowArray.map((el, index) => [el, index]);
  stabilizedRowAray.sort((a, b) => {
    const order = compatator(a[0], b[0]);

    if (order !== 0) return order;
    return (a[1] = b[1]);
  });

  return stabilizedRowAray.map((el) => el[0]);
};

export default function TableContent() {
  const [orderDirection, setOrderDirection] = useState("desc");
  const [valueToOrderBy, setValueToOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [rowDataInfo, setRowDataInfo] = useState([]);

  const handlePageChange = async (event) => {
    setPage((prev) => prev + 1);
    console.log(page);
  };

  useEffect(() => {
    async function getData() {
      let rowData = [];
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc
          &per_page=${rowsPerPage}&page=${page}&sparkline=false&price_change_percentage=24h%2C7d`
        );
        console.log(response.data);      
        rowData = response.data.map((el) => {
          const tempObj = {
            "name": el.name,
            "price": el.current_price,
            "rank": el.market_cap_rank,
            "24h": el.price_change_percentage_24h_in_currency,
            "7d": el.price_change_percentage_7d_in_currency,
            "marketCap": el.market_cap,
            "volume":el.total_volume,
            "supply":el.circulating_supply,
            "image":el.image,
            "symbol":el.symbol,
            "total_supply":el.total_supply
          };

          return tempObj;
        });
        console.log(rowData);
      } catch (error) {
        console.error(error);
      }
      // console.log(rowData)
      setRowDataInfo(rowData);
    }
    getData();
  }, [page, rowsPerPage]);

  const handleRequestSort = (event, property) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHeader
            valueToOrderBy={valueToOrderBy}
            orderDirection={orderDirection}
            handleRequestSort={handleRequestSort}
          />
          {sortedRowInformation(
            rowDataInfo,
            getComparator(orderDirection, valueToOrderBy)
          ).map((person, index) => (
            <TableRow key={person.name}>
              <TableCell>
                  <StarBorder/>
                  {person.rank}
              </TableCell>
              <TableCell>{person.name}</TableCell>
              <TableCell>{person.price}</TableCell>
              <TableCell>{person['24h']}</TableCell>
              <TableCell>{person['7d']}</TableCell>
              <TableCell>{person.marketCap}</TableCell>
              <TableCell>{person.volume}</TableCell>
              <TableCell>{person.supply}</TableCell>
            </TableRow>
          ))}
        </Table>
        <Button onClick={handlePageChange}>next page</Button>
      </TableContainer>
    </>
  );
}
