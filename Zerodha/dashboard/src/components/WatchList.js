import React,{useState} from "react";
import {Tooltip,Grow} from  "@mui/material";
import {watchlist, watchList} from "../data/data";

import { BarChartOutlined, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import MoreHoriz from '@mui/icons-material/MoreHoriz';




const WatchList = () => {
  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts">{watchlist.length}</span>
      </div>

      <ul className="list">
        {watchlist.map((stock,index)=>{
          return(
            <WatchListItem stock={stock} key={index}/>
        )})}
      </ul>
    </div>
  );
};

export default WatchList;

//watchlist component here 

const WatchListItem=({stock})=>{
  //to know which stock is selected
  const [showWatchListActions,setshowWatchListActions]= useState(false);
  //event handlers to show when the stock is hovered or not
  const handleMouseEnter=(e) =>{
    setshowWatchListActions(true);
  };
  const handleMouseLeave=(e) =>{
    setshowWatchListActions(false);
  };

  return(
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="item">
            <p className={stock.isDown ? "down" : "up" }>{stock.name}</p>
             <div className="itemInfo">
              <span className="percent">{stock.percent}</span>
              {stock.isDown ? (
                <KeyboardArrowDown className="down"/>
              ) : ( <KeyboardArrowUp className="up"/>
              
              )} 
              <span className="price">{stock.price}</span>
             </div>
        </div>
        {showWatchListActions && <WatchListActions uid={stock.name}/>} {/*using && and means only when condition is true the watchlist will be displayed*/}
    </li>

  );
};

//when a particular stock is hovered some options will be visible id will be input for that 
const WatchListActions=({uid}) =>{
  return (
    <span className="actions">
      <span>
        <Tooltip 
          title="Buy (B)"
          placement="right"
          arrow TransitionComponent={Grow} //creating a tooltip for that menu to show
        >
          <button className="buy">Buy</button>
        </Tooltip>
        <Tooltip 
          title="Sell (S)"
          placement="right"
          arrow TransitionComponent={Grow} //creating a tooltip for that menu to show
        >
          <button className="sell">Sell</button>
        </Tooltip>
        <Tooltip 
          title="Analytics (A)"
          placement="right"
          arrow TransitionComponent={Grow} //creating a tooltip for that menu to show
        >
        <button className="action" ><BarChartOutlined className="icon"/></button>
        </Tooltip>
        <Tooltip 
          title="More"
          placement="right"
          arrow TransitionComponent={Grow} //creating a tooltip for that menu to show
        >
          <button className="action"><MoreHoriz className="icon"/></button>
        </Tooltip>
      </span>
    </span>
  )
}