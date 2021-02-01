import React from "react";
import { Menu } from "antd";
import styles from "./Nav.module.css";
import { NavLink } from "react-router-dom";


const { SubMenu } = Menu;

function Nav() {
  return (
    <div className={styles.menu}>
      <NavLink to="/">
        <span>
          <a>Cryptocurrencies</a>
        </span>
      </NavLink>
      <NavLink to="/Exchanges">
        <span>
          <a>Exchanges</a>
        </span>
      </NavLink>
      <NavLink to="/Platforms">
      <span>
        <a>Platforms</a>
      </span>
      </NavLink>
      <NavLink to="/Trending">
      <span>
        <a>Trending</a>
      </span>
      </NavLink>
    </div>
  );
}

export default Nav;
