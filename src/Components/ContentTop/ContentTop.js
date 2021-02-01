import React from "react";
import styles from "./ContentTop.module.css";
import TopLeft from "./TopLeft/TopLeft";
// import { Button } from "antd";

function ContentTop() {
  return (
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
  );
}

export default ContentTop;
