import React from "react";
import styles from "./Content.module.css";
import ContentTop from "./ContentTop/ContentTop";
import ContentTable from "./ContentTable/ContentTable";
import { Route, Switch } from "react-router-dom";

import Exchange from '../Exchange/Exchange';
import Platforms from '../Platforms/Platforms';


function Content() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <ContentTop />
      </div>
      <div className={styles.table}>
        <ContentTable />
      </div>

      {/* <Switch>
        <Route exact path="/">
          <Content/>
        </Route>
        
        <Route path="/watchlist">
          <Exchange />
        </Route>
        <Route path="/derivatives">
          <Platforms />
        </Route>
        <Route path="/defi">
          <Platforms />
        </Route>
        
      </Switch> */}


    </div>
  );
}

export default Content;
