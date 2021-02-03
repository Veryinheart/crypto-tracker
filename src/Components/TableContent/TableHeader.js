import React from "react";
import {
  TableHead,
  TableCell,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";

function TableHeader(props) {
  const { valueToOrderBy, orderDirection, handleRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
         
        <TableCell>
          <TableSortLabel
            active={valueToOrderBy === "rank"}
            direction={valueToOrderBy === "rank" ? orderDirection : "asc"}
            onClick={createSortHandler("rank")}
          >
            #
          </TableSortLabel>
        </TableCell>
        <TableCell key="name">
          <TableSortLabel
            active={valueToOrderBy === "name"}
            direction={valueToOrderBy === "name" ? orderDirection : "asc"}
            onClick={createSortHandler("name")}
          >
            Name
          </TableSortLabel>
        </TableCell>
        <TableCell align="right">
          <TableSortLabel
            active={valueToOrderBy === "price"}
            direction={valueToOrderBy === "price" ? orderDirection : "asc"}
            onClick={createSortHandler("price")}
          >
            Price
          </TableSortLabel>
        </TableCell>
        <TableCell align="right">
          <TableSortLabel
            active={valueToOrderBy === "24h"}
            direction={valueToOrderBy === "24h" ? orderDirection : "asc"}
            onClick={createSortHandler("24h")}
          >
            24h
          </TableSortLabel>
        </TableCell>
        <TableCell align="right">
          <TableSortLabel
            active={valueToOrderBy === "7d"}
            direction={valueToOrderBy === "7d" ? orderDirection : "asc"}
            onClick={createSortHandler("7d")}
          >
            7d
          </TableSortLabel>
        </TableCell>
        <TableCell align="right">
          <TableSortLabel
            active={valueToOrderBy === "marketCap"}
            direction={valueToOrderBy === "marketCap" ? orderDirection : "asc"}
            onClick={createSortHandler("marketCap")}
          >
            Market Cap
          </TableSortLabel>
        </TableCell>
        <TableCell align="right">
          <TableSortLabel
            active={valueToOrderBy === "volume"}
            direction={valueToOrderBy === "volume" ? orderDirection : "asc"}
            onClick={createSortHandler("volume")}
          >
            Volume
          </TableSortLabel>
        </TableCell>
        <TableCell align="right" variant="head">
          <TableSortLabel
            active={valueToOrderBy === "supply"}
            direction={valueToOrderBy === "supply" ? orderDirection : "asc"}
            onClick={createSortHandler("supply")}
          >
            Supply
          </TableSortLabel>
        </TableCell>
        <TableCell>
            Last 7 Days
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
