import React from "react";
import styles from "./ContentTable.module.css";
import TableNav from "./TableNav/TableNav";
import TableContent from "../../../Components/TableContent/TableContent";

import { Route, Switch } from "react-router-dom";
import Exchange from '../../Exchange/Exchange';
import Platforms from '../../Platforms/Platforms';

function ContentTable() {
  return (
    <div className={styles.conatiner}>
      {/* <div>
        <TableNav />
      </div> */}
      <div>
        <TableContent />
      </div>

      {/* <Switch>
        <Route path="/watchlist">
          <Exchange />
        </Route>
        <Route path="/derivatives">
          <Platforms />
        </Route>
      </Switch> */}
    </div>
  );
}

export default ContentTable;
