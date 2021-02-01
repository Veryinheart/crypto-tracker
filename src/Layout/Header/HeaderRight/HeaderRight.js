import React from "react";
import styles from "./HeaderRight.module.css";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

function HeaderRight() {
  return (
     <div className={styles.container}>
      <div className={styles.header_right}>
        <div className={styles.search}>
          <input />
        </div>

        <div className={styles.bell}>
          <FontAwesomeIcon icon={faBell} />
        </div>
        <div>
          <Button shape="round" size="large" type="text">
            <b>Log In</b>
          </Button>
        </div>
        <div>
          <Button shape="round" size="large" type="primary">
            <b>Sign up</b>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeaderRight;
