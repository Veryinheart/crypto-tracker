import React, { useState, useEffect } from "react";
import coinGecko from "../../apis/coinGecko";
import styles from "./Top.module.css";
import LanguageDropDown from "../../Components/Dropdown/LanguageDropDown";
import CurrenciesDropDown from "../../Components/Dropdown/CurrenciesDropDown";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
// import { useRouteMatch } from "react-router-dom";

function Top() {
  const [TopData, setTopData] = useState({});
  const [btc, setBtc] = useState(0);
  const [percent, setPercent] = useState(0);
  // const [state, setstate] = useState(initialState)

  // const { path, url } = useRouteMatch();
  // console.log(path, url);

  useEffect(() => {
    //fetch top data
    const fetchTopData = async () => {
      const response = await coinGecko.get("/global");
      // console.log(response.data);
      setTopData(response.data.data);
      const percentTmp =
        response.data.data.market_cap_change_percentage_24h_usd ?? 2.1;
      setPercent(percentTmp);
      const btcTmp = response.data.data.market_cap_percentage.btc ?? 63.3;
      setBtc(btcTmp);
    };

    fetchTopData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.top_left}>
          <span>
            <b>
              Cryptocurrencies:<a>{TopData.active_cryptocurrencies}</a>
            </b>
          </span>
          <span>
            <b>
              Markets:<a>{TopData.markets}</a>
            </b>
          </span>
          <span>
            <b>
              24h Change Percent:<a>{percent.toFixed(2)}%</a>
            </b>

            {/* {TopData.market_cap_change_percentage_24h_usd.toFixed(2)}% */}
          </span>
          <span>
            <b>
              BTC Dominance:<a>{btc.toFixed(2)}%</a>
            </b>
          </span>
        </div>
        <div className={styles.top_right}>
          <div>
            <LanguageDropDown />
          </div>
          <div>
            <CurrenciesDropDown />
          </div>

          <div>
            <Button type="text">
              <FontAwesomeIcon icon={faMoon} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Top;
