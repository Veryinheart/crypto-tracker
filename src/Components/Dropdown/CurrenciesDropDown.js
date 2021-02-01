import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import styles from './DropDown.module.css';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <b>English</b>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      <b>中文</b>
    </Menu.Item>
  </Menu>
);

function CurrenciesDropDown() {
  return (
    <div className={styles.CurrenciesDropDown}>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button type="text" shape="round" onClick={(e) => e.preventDefault()}>
          <b>English </b>
          <CaretDownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
}

export default CurrenciesDropDown;
