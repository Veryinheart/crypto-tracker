import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TableSortLabel } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";

import coinGecko from "../../../../apis/coinGecko";

const columns = [
  {
    id: "watchlist",
    label: "",
    maxWidth:20,
    renderCell: (params) => params,
  },
  { id: "market_cap_rank", label: "Rank" },
  {
    id: "name",
    label: "Name",
    minWidth: 30,
  },
  { id: "price", label: "Price", minWidth: 70, align: "right" },
  {
    id: "price_change_percentage_24h_in_currency",
    label: "24h",
    minWidth: 70,
    align: "right",
    format: (value) => value.toFixed(4),
    renderCell: (params) => (
      <strong>
        {/* {params.value.toLocaleString("en-US").toFixed(4)}% */}
      </strong>
    ),
  },
  {
    id: "price_change_percentage_7d_in_currency",
    label: "7d",
    minWidth: 70,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "market_cap",
    label: "Market Cap",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "total_volume",
    label: "Volume",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {},
});

export default function CoinTable2() {
  const classes = useStyles();

  const pages = [10, 20, 50];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [cryptocoinarr, setCryptocoinarr] = useState([]);

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

      setCryptocoinarr([...cryptocoinarr, ...temp]);
      // console.log(cryptocoinarr);
    };

    // const timer = setInterval(() => {
    //   console.log("object");
      fetchTopData();
    // }, 1000 * 60);

    // return () => clearInterval(timer);

    // fetchTopData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <TableSortLabel>{column.label}</TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {cryptocoinarr
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];

                      if (column.id === "watchlist") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Tooltip placement="top" title="Add to Watchlist">
                              <a>
                                <StarBorderIcon style={{ color: "gold" }} />
                              </a>
                            </Tooltip>
                          </TableCell>
                        );
                      } else if (column.id === "name") {
                        // console.log(value);
                        return (
                          <TableCell
                            key={column.id}
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                            }}
                          >
                            <Avatar alt={value[0]} src={value[1]} />
                            <strong style={{ marginLeft: "5px" }}>
                              {value[0]}
                            </strong>
                            <strong
                              style={{ color: "grey", marginLeft: "5px" }}
                            >
                              {value[2]}
                            </strong>
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={pages}
        component="div"
        count={250}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
