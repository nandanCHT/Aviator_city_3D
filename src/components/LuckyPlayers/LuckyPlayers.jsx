// import React from "react";
// // import "./luckyPlayer.css";
// import "./LuckyPlayers.css";
// import { image } from "../../assets/image";

// const LuckyPlayer = ({ betData, oneCashout, planeData }) => {

//   let totalBetUser = betData.length;

//   console.log("Betdata", betData);
//   console.log("oneCashdata", oneCashout);
//   const combinedArray = betData.map((item, index) => {
//     return {
//       name: item?.name,
//       amount: item?.webhookData?.amount,

//       max_mult: oneCashout[index]?.max_mult,
//       final_amount: oneCashout[index]?.final_amount,
//     };
//   });

//   console.log("CombineArray", combinedArray);
//   return (
//     <>
//       <div className="lp_Main">
//         <div className="lp_main2">
//           <div className="LP_Main3">
//             <div className="lp-main4">
//               <div className="lp_q">{image.luckyPlayer}</div>
//               <h2 className="lp_p">Lucky Players </h2>
//               <h2
//                 className="lp_p"
//                 style={{ color: "var(--tableText)", fontWeight: "bold" }}
//               >
//                 {totalBetUser}
//               </h2>
//             </div>
//           </div>
//         </div>
//         {/* Start */}
//         <div className="lucky-plyer-main">
//           <div className="scrollable-content">
//             <table>
//               <thead style={{}}>
//                 <tr className="table-tr">
//                   <th>USER</th>
//                   <th>
//                     BET <span className="bet-total">6722</span>
//                   </th>
//                   <th>X</th>
//                   <th className="win-th">WIN</th>
//                 </tr>
//               </thead>
//               <tbody className="tBody">
//                 {combinedArray.map((player, index) => (
//                   <tr key={index}>
//                     <td>{player.name}</td>
//                     <td>
//                       <div className="l-td">
//                         {image.coin}
//                         {player.amount}
//                       </div>
//                     </td>
//                     <td
//                       className="lucky-multiplier"
//                       style={{
//                         color: player.max_mult ? "#22c55e" : "inherit",
//                       }}
//                     >
//                       {player.max_mult !== "undefined" ?  player.max_mul : "--"}
//                     </td>
//                     <td
//                       className="lucky-multiplier"
//                       style={{
//                         color: player.final_amount ? "#22c55e" : "inherit",
//                       }}
//                     >
//                       {player.final_amount !== "undefined"
//                         ? player.final_amount
//                         : "--"}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="square"></div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LuckyPlayer;

// import React, { useEffect, useState } from "react";
// import "./LuckyPlayers.css";
// import { image } from "../../assets/image";

// const LuckyPlayer = ({ betData, oneCashout, planeData }) => {

//   const [newBetData, setNewBetData] = useState([]);
//   // const [newOneCashoutData, setNewOneCashOutData] = useState([]);

//   const parsedBetData = planeData?.length > 0 ? planeData.split(":") : null;
//   const planeStatus =
//     parsedBetData?.length > 0 ? parseInt(parsedBetData[2], 10) : 0;

//   useEffect(() => {

//     if (planeStatus === 0) {
//       setNewBetData(betData);
//       // setNewOneCashOutData(oneCashout);
//     } else if (planeStatus === 2) {
//       const timer = setTimeout(() => {
//         setNewBetData([]);
//         // setNewOneCashOutData([]);
//       }, 5000);

//       return () => clearTimeout(timer);
//     }
//   }, [planeStatus, betData, oneCashout]);

//   const combinedArray = newBetData?.map((item, index) => ({
//     name: item?.name || "Unknown User",
//     amount: item?.webhookData?.amount || 0,
//     max_mult: oneCashout[index]?.max_mult || "--",
//     final_amount: oneCashout[index]?.final_amount || "--",
//   }));

//   return (
//     <div className="lp_Main">
//       <div className="lp_main2">
//         <div className="LP_Main3">
//           <div className="lp-main4">
//             <div className="lp_q">{image.luckyPlayer}</div>
//             <h2 className="lp_p">Lucky Players</h2>
//             <h2
//               className="lp_p"
//               style={{ color: "var(--tableText)", fontWeight: "bold" }}
//             >
//               {betData.length}
//             </h2>
//           </div>
//         </div>
//       </div>

//       {/* Start */}
//       <div className="lucky-plyer-main">
//         <div className="scrollable-content">
//           <table>
//             <thead>
//               <tr className="table-tr">
//                 <th>USER</th>
//                 <th>
//                   BET <span className="bet-total">6722</span>
//                 </th>
//                 <th>X</th>
//                 <th className="win-th">WIN</th>
//               </tr>
//             </thead>
//             <tbody className="tBody">
//               {combinedArray.map((player, index) => (
//                 <tr key={index}>
//                   <td>{player.name}</td>
//                   <td>
//                     <div className="l-td">
//                       {image.coin}
//                       {player.amount}
//                     </div>
//                   </td>
//                   <td
//                     className="lucky-multiplier"
//                     style={{
//                       color: player.max_mult !== "--" ? "#22c55e" : "inherit",
//                     }}
//                   >
//                     {player.max_mult}
//                   </td>
//                   <td
//                     className="lucky-multiplier"
//                     style={{
//                       color:
//                         player.final_amount !== "--" ? "#22c55e" : "inherit",
//                     }}
//                   >
//                     {player.final_amount}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="square"></div>
//       </div>
//     </div>
//   );
// };

// export default LuckyPlayer;

import React, { useEffect, useState } from "react";
import "./LuckyPlayers.css";
import { image } from "../../assets/image";

const LuckyPlayer = ({ betData, oneCashout, planeData, cashoutData }) => {
  const [newBetData, setNewBetData] = useState([]); // Ensure initial state is an empty array
  const [showBetData, setShowBetData] = useState(false);
  // const [newOneCashoutData, setNewOneCashOutData] = useState([]);

  const parsedBetData = planeData?.length > 0 ? planeData.split(":") : null;
  const planeStatus =
    parsedBetData?.length > 0 ? parseInt(parsedBetData[2], 10) : 0;
  const endDelay = parsedBetData?.length > 0 ? parsedBetData[1] : 0;

  useEffect(() => {
    if (endDelay >= 4) {
      setShowBetData(true);
    }

    if (planeStatus == 2) {
      const timer = setTimeout(() => {
        setShowBetData(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [endDelay]);

  useEffect(() => {
    if (planeStatus === 0) {
      setNewBetData(Array.isArray(betData) ? betData : []); // Ensuring betData is an array
      // setNewOneCashOutData(oneCashout);
    } else if (planeStatus === 2) {
      const timer = setTimeout(() => {
        setNewBetData([]);
        // setNewOneCashOutData([]);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [planeStatus, betData, oneCashout]);

  const combinedArray = Array.isArray(newBetData)
    ? newBetData.map((item, index) => ({
        name: item?.name || "Unknown User",
        amount: item?.webhookData?.amount || 0,
        max_mult: cashoutData[index]?.max_mult || "--",
        final_amount: cashoutData[index]?.final_amount || "--",
      }))
    : [];

  return (
    <div className="lp_Main">
      <div className="lp_main2">
        <div className="LP_Main3">
          <div className="lp-main4">
            <div className="lp_q">{image.luckyPlayer}</div>
            <h2 className="lp_p">Lucky Players</h2>
            {showBetData ? (
              <h2
                className="lp_p"
                style={{ color: "var(--tableText)", fontWeight: "bold" }}
              >
                {betData.length}
              </h2>
            ) : (
              <h2
                className="lp_p"
                style={{ color: "var(--tableText)", fontWeight: "bold" }}
              >
                0
              </h2>
            )}
          </div>
        </div>
      </div>

      {/* Start */}
      <div className="lucky-plyer-main">
        <div className="scrollable-content">
          <table>
            <thead>
              <tr className="table-tr">
                <th>USER</th>
                <th>
                  BET <span className="bet-total">6722</span>
                </th>
                <th>X</th>
                <th className="win-th">WIN</th>
              </tr>
            </thead>
            {/* <div className="tBody"> */}
            {showBetData && (
              <tbody className="">
                {combinedArray.map((player, index) => (
                  <tr key={index} >
                    <td style={{ fontWeight: "700", fontSize: "14px" }}>
                      {player.name.slice(0, 3)}***
                    </td>
                    <td>
                      <div
                        className="l-td"
                        style={{ fontWeight: "700", fontSize: "14px" }}
                      >
                        {image.coin}
                        {player.amount}
                      </div>
                    </td>
                    <td
                      className="lucky-multiplier"
                      style={{
                        color: player.max_mult !== "--" ? "#22c55e" : "inherit",
                        fontWeight: "700",
                        fontSize: "14px",
                      }}
                    >
                      {player.max_mult}
                    </td>
                    <td
                      className="lucky-multiplier"
                      style={{
                        color:
                          player.final_amount !== "--" ? "#22c55e" : "inherit",
                        fontWeight: "700",
                        fontSize: "14px",
                      }}
                    >
                      {player.final_amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
            {/* </div> */}
          </table>
        </div>
        <div className="square-2"></div>
      </div>
    </div>
  );
};

export default LuckyPlayer;
