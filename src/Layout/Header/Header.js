import React from "react";
import styles from "./Header.module.css";
import Nav from "../../Components/Nav/Nav";
import HeaderRight from './HeaderRight/HeaderRight';
import Logo from "../../Image/Logo.png";


function Header() {
  return (
    <div class={styles.container}>
      <div className={styles.Header}>
        <div className={styles.header_left}>
          <div>
            <a>
              <img href=":/" src={Logo} alt="Logo" />
            </a>
          </div>
          <div>
            <Nav />
          </div>
        </div>
        <div className={styles.header_right}>
            <HeaderRight/>
        </div>
      </div>
    </div>
  );
}

export default Header;
