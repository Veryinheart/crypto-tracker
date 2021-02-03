import React, { useState } from "react";
import TableHeader from "./TableHeader";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";

import CellFont from "../CellFont/CellFont";
import { StarBorder } from "@material-ui/icons";
import Pagination from "@material-ui/lab/Pagination";

// const rowInformation = [
//   { name: "bobo", price: 20, rank: 1 },
//   { name: "alice", price: 241, rank: 2 },
//   { name: "kriran", price: 25, rank: 4 },
//   { name: "william", price: 30, rank: 3 },
// ];
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
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [rowDataInfo, setRowDataInfo] = useState([]);

  const handlePageChange = async (event, page) => {
    // console.log(page)
    // console.log(event)
    setPage(page);
    // console.log(page);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  useEffect(() => {
    async function getData() {
      let rowData = [];
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc
          &per_page=${rowsPerPage}&page=${page}&sparkline=false&price_change_percentage=24h%2C7d`
        );
        // console.log(response.data);
        rowData = response.data.map((el) => {
          const tempObj = {
            name: el.name,
            price: el.current_price,
            rank: el.market_cap_rank,
            "24h": el.price_change_percentage_24h_in_currency,
            "7d": el.price_change_percentage_7d_in_currency,
            marketCap: el.market_cap,
            volume: el.total_volume,
            image: el.image,
            symbol: el.symbol,
            total_supply: el.total_supply,
            circulating_supply: el.circulating_supply,
          };

          return tempObj;
        });
        // console.log(rowData);
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
          ).map((coin, index) => (
            <TableRow key={coin.name}>
              <TableCell>
                <StarBorder fontSize="small" />
                {coin.rank}
              </TableCell>
              <TableCell align="left">
                <CellFont value={[coin.name,coin.image,coin.symbol]} id={'name'}/>
              </TableCell>
              <TableCell align="right">
                <CellFont value={coin.price} />
              </TableCell>
              <TableCell align="right">
                <CellFont percentNum={coin["24h"]} />
              </TableCell>
              <TableCell align="right">
                <CellFont percentNum={coin["7d"]} />
              </TableCell>
              <TableCell align="right">
                <CellFont value={coin.marketCap} />
              </TableCell>
              <TableCell align="right">
                <CellFont value={coin.volume} />
              </TableCell>
              <TableCell align="right">
                <CellFont value={Math.ceil(coin.circulating_supply)} />
                &nbsp;{coin["symbol"].toUpperCase()}
              </TableCell>
            </TableRow>
          ))}
        </Table>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <strong>
            Showing {(page - 1) * rowsPerPage + 1} - {page * rowsPerPage} out of
            6616
          </strong>
          <Pagination count={62} onChange={handlePageChange} shape="rounded" />
          <FormControl>
            <Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* <Button onClick={handlePageChange}>next page</Button> */}
      </TableContainer>
    </>
  );
}
