import React, { useEffect, useState } from "react";
import {
  TableBody,
  TableCell,
  TableRow,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import useTable from "./useTable";
import CellFont from "./CellFont";
import { StarBorder } from "@material-ui/icons";
import { Spin } from "antd";

import coinGecko from "../../../../apis/coinGecko";

const headCells = [
  {
    id: "watchlist",
    label: "",
    minWidth: 10,
  },
  { id: "market_cap_rank", label: "Rank", minWidth: 10 },
  {
    id: "name",
    label: "Name",
    minWidth: 50,
  },
  { id: "price", label: "Price", minWidth: 70, align: "right" },
  {
    id: "price_change_percentage_24h_in_currency",
    label: "24h",
    minWidth: 30,
    align: "right",
  },
  {
    id: "price_change_percentage_7d_in_currency",
    label: "7d",
    minWidth: 30,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "market_cap",
    label: "Market Cap",
    minWidth: 70,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "total_volume",
    label: "Volume",
    minWidth: 70,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function CoinTable() {
  const [records, setRecords] = useState([]);
  const pages = [10, 20, 50, 100];
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

  const {
    TblContainer,
    TblHead,
    // TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells);

  useEffect(() => {
    //fetch coins data
    const fetchTopData = async () => {
      const response = await coinGecko.get(
        `coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&per_page=${rowsPerPage}&page=${page}&sparkline=false&price_change_percentage=24h%2C7d`
      );
      const temp = [];
      response.data.map((ele) => {
        temp.push({
          watchlist: ele["id"],
          name: [ele["name"], ele["image"], ele["symbol"].toUpperCase()],
          id: ele["id"],
          price: ele["current_price"],
          market_cap: ele["market_cap"],
          total_volume: ele["total_volume"],
          market_cap_rank: ele["market_cap_rank"],
          price_change_percentage_24h_in_currency:
            ele["price_change_percentage_24h_in_currency"],
          price_change_percentage_7d_in_currency:
            ele["price_change_percentage_7d_in_currency"],
        });
      });
      setRecords([...temp]);
      // console.log(records);
    };
    // fetchTopData();
    // const timer = setInterval(
    //   () => {
    //     console.log("object")
    //     fetchTopData();
    //   },
    //   1000
    // );

    // return () => clearInterval(timer);

    // console.log(records)
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(event.target.value);
    setRowsPerPage(event.target.value);
    setPage(1);
  };

  return (
    <>
      <TblContainer>
        {records.length ? (
          <>
            <TblHead />

            <TableBody>
              {recordsAfterPagingAndSorting().map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <StarBorder />
                  </TableCell>
                  <TableCell>{item.market_cap_rank}</TableCell>
                  <TableCell>
                    <CellFont value={item.name} id="name" />
                  </TableCell>
                  <TableCell align="right">
                    <CellFont value={item.price} currency={"usd"} />
                  </TableCell>
                  <TableCell align="right">
                    <CellFont
                      percentNum={item.price_change_percentage_24h_in_currency}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <CellFont
                      percentNum={item.price_change_percentage_7d_in_currency}
                    />
                    {/* {item.price_change_percentage_7d_in_currency} */}
                  </TableCell>
                  <TableCell align="right">
                    <CellFont value={item.market_cap} />
                  </TableCell>
                  <TableCell align="right">
                    <CellFont value={item.total_volume} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </>
        ) : (
          <div>
            {/* <Spin tip="Loading..." /> */}
            <CircularProgress />
          </div>
        )}
      </TblContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <strong>
          Showing {(page - 1) * rowsPerPage + 1} - {page * rowsPerPage} out of
          6616
        </strong>
        <Pagination
          count={Math.ceil(6616 / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          shape="rounded"
        />
        <FormControl>
          
          <Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
      </div>
    </>
  );
}

export default CoinTable;
