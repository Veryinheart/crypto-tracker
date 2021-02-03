import React from "react";
import styles from "./DefaultLayout.module.css";
import Top from "./Top/Top";
import Header from "./Header/Header";
import Content from "./Content/Content";
import { Route, Switch } from "react-router-dom";
import Exchange from "./Exchange/Exchange";
import Trending from "./Trending/Trending";
import Platforms from "./Platforms/Platforms";

function DefaultLayout() {
  return (
    <div className={styles.container}>
      <Top />
      <Header />

      <Switch>
        <Route exact path="/">
          <Content/>
        </Route>
        
        <Route path="/Exchanges">
          <Exchange />
        </Route>
        <Route path="/Platforms">
          <Platforms />
        </Route>
        <Route path="/Trending">
          <Trending />
        </Route>
        <Route path="/watchlist">
          <Content/>
        </Route>
      </Switch>

      <div>Footer</div>
    </div>
  );
}

export default DefaultLayout;
