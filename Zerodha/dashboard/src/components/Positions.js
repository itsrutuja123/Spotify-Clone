import React,{useState,useEffect}from "react";
import axios from 'axios';  



const Positions = () => {
    const [allPositions,setAllPositions] = useState([]);
    useEffect(()=>{
      //this axios.get will connect to link in backend
      axios.get("http://localhost:3002/allPositions").then((res)=>{
        setAllPositions(res.data);
        console.log(res.data);
      });
    },[]);
  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>
          


          {allPositions.map((stock,index)=>{   {/* creating temporary variables to calculate certain data that should be displayed*/}
                const curValue=stock.price* stock.qty;
                const isProfit = curValue- stock.avg * stock.qty >=0.0;  
                const profClass =isProfit ? "profit" :"loss";  {/*profit class will be detect if it is profit or loss , if profit display green otherwise by red */}
                const dayClass = stock.isLoss ? "loss" : "profit";

                return (
                  <tr key={index} >
                      <td>{stock.product}</td>
                      <td>{stock.name}</td>
                      <td>{stock.qty}</td>
                      <td>{stock.avg.toFixed(2)}</td>  {/*toFixed will take the price upto 2 decimal places*/}
                      <td>{stock.price.toFixed(2)}</td>
                      
                      <td className={profClass}>{(curValue-stock.avg*stock.qty).toFixed(2)}</td>
                      
                      <td className={dayClass}>{stock.day}</td>
                    </tr>
                  
                );
          })};

        </table>
      </div>
    </>
  );
};

export default Positions;