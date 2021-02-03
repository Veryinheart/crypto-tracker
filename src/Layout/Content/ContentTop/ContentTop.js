import React from "react";
import styles from "./ContentTop.module.css";
import TopLeft from "./TopLeft/TopLeft";
// import { Button } from "antd";
import TableNav from '../ContentTable/TableNav/TableNav'

function ContentTop() {
  return (
    <>
    <div className={styles.container}>
      <div className={styles.top_left}>
        <TopLeft />
      </div>

      <div className={styles.top_right}>
        <span>BB</span>
        <span>BB</span> <span>BB</span> <span>BB</span> <span>BB</span>{" "}
        <span>BB</span> <span>BB</span>
      </div>
      
    </div>
    <TableNav/>
    </>
  );
}

export default ContentTop;
