import React from "react";
import styles from "./TableNav.module.css";
import { Button, Input, Select } from "antd";
import { StarOutlined, SearchOutlined } from "@ant-design/icons";
import { NavLink, Link, useRouteMatch } from "react-router-dom";

import {TextField} from '@material-ui/core';

const { Option } = Select;

const { Search } = Input;
const placeholder = `<SearchOutlined /> Search`;

function TableNav() {
  const { path, url } = useRouteMatch();
  console.log(path,url);
  return (
    <div className={styles.container}>
      <div className={styles.Nav}>
        <Link to={`${path}/watchlist`}>
          <Button icon={<StarOutlined />} shape="round" type="text">
            Watchlist
          </Button>
        </Link>
        <Button shape="round" type="text">
          Cryptocurrencies
        </Button>
        <Button shape="round" type="text">
          Derivatives
        </Button>
        <Button shape="round" type="text">
          DeFi
        </Button>
      </div>
      <div className={styles.search}>
        {/* <Input className={styles.input} placeholder="Borderless" bordered={false} /> */}
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          enterButton
          style={{ width: 200, margin: "0 10px" }}
        />
       
        {/* <TextField
          variant="outlined"
          // style={{ width: "50%", height:"20px",margin: "0 10px" }}
          size="small"
        /> */}
       
        <span> Show Rows </span>
        <Select defaultValue="50">
          <Option value="20">20</Option>
          <Option value="50">50</Option>
          <Option value="100">100</Option>
        </Select>
      </div>
    </div>
  );
}

export default TableNav;
