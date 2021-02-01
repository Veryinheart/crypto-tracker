import React from "react";
import { Typography } from "antd";
import styles from "./TopLeft.module.css";
import { useState } from "react";

const { Title, Paragraph } = Typography;
function TopLeft(props) {
  const [expand, setExpand] = useState({
    expandble: false,
    counter: 0,
  });

  const typoExpand = () => {
    setExpand((prevState) => ({
      ...prevState,
      expandble: true,
      counter: !expand.expandble
        ? expand.counter + 0
        : expand.counter + 1,
    }));
  };
  const typoClose = () => {
    setExpand((prevState) => ({
      ...prevState,
      expandble: false,
      counter: !expand.expandble
        ? expand.counter + 0
        : expand.counter + 1,
    }));
  };
  const text = `Ant Design, a design language for
  background applications, is refined by Ant UED Team. Ant Design, a
  design language for background applications, is refined by Ant UED
  Team. Ant Design, a design language for background applications, is
  refined by Ant UED Team. Ant Design, a design language for
  background applications, is refined by Ant UED Team. Ant Design, a
  design language for background applications, is refined by Ant UED
  Team.`;

  const renderParagraph = () => {
    return (
      <div key={expand.counter} className={styles.container}>
        <Typography>
          <Title> Today's {} Prices by CoinGecko</Title>
          <Paragraph
            ellipsis={{
              rows: 3,
              expandable: true,
              onExpand: typoExpand,
              symbol: "Read more"
            }}
          >
            {text}
          </Paragraph>
        </Typography>
      </div>
    );
  };

  return (
    <div>
      {/* <div key={expand.counter} className={styles.container}>
        <Typography>
          <Title> Today's {} Prices by CoinGecko</Title>
          <Paragraph
            // ellipsis={{
            //   rows: 2,
            //   expandable: true,
            //   symbol: "Read more",
            // }}
            ellipsis={{
              rows: 3,
              expandable: true,
              onExpand: typoExpand,
            }}
          >
            {text}
            {/* {text} <a onClick={handleExpand()}>Read Less</a> */}
      {/* </Paragraph>
        </Typography> */}
      {/* </div> */}

      {renderParagraph()}
      {expand.expandble && <a onClick={typoClose}>Read less</a>}
    </div>
  );
}

export default TopLeft;
