import React from "react";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    small: {
        width: "40px",
        height: "40px",
      },
})); 
export default function CellFont(props) {


   
    // const classes = useStyles();

  const { percentNum, value, id } = props;
  //   console.log(props.percentNum > 0);

  //   console.log(value)
  if (id && id === "name") {
    
    return (
      <div style={{display:"flex",justifyContent:"flex-start",alignItems:'center'}}>
        <Avatar alt={value[0]} src={value[1]} style={{width:"30px",height:"30px",margin:"5px,0"}}/>
        <strong style={{ marginLeft: "5px" }}>{value[0]}</strong>
        <strong style={{ color: "grey", marginLeft: "5px" }}>{value[2]}</strong>
      </div>
    );
  } else if (value) {
    //   console.log(value.id)
    return (
      <strong>
        {value.toLocaleString({
          style: "currency",
          currency: "USD",
          currencyDisplay: "symbol",
        })}
      </strong>
    );
  } else {
    return (
      <>
        {percentNum > 0 ? (
          <strong
            style={{
              display: "flex",
              alignItems: "center",
              color: "green",
              justifyContent: "flex-end",
            }}
          >
            <ArrowDropUpIcon />
            {percentNum.toFixed(4)}%
          </strong>
        ) : (
          <strong
            style={{
              display: "flex",
              alignItems: "center",
              color: "red",
              justifyContent: "flex-end",
            }}
          >
            <ArrowDropDownIcon />
            {percentNum.toFixed(4)}%
          </strong>
        )}
      </>
    );
  }
}
