import React from 'react'
import ContentTop from '../../Components/ContentTop/ContentTop'
import styles from "./Exchange.module.css";

function Exchange() {
    return (
        <div className={styles.container}>
      <div className={styles.top}>
        <ContentTop />
      </div>
      <div>
          <h1>exchange</h1>
      </div>
      {/* <div className={styles.table}>
        <ContentTable />
      </div> */}
    </div>
    )
}

export default Exchange
