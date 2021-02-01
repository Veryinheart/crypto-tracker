import React from "react";
import styles from "./Content.module.css";
import ContentTop from "./ContentTop/ContentTop";
import ContentTable from "./ContentTable/ContentTable";

function Content() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <ContentTop />
      </div>
      <div className={styles.table}>
        <ContentTable />
      </div>
    </div>
  );
}

export default Content;
