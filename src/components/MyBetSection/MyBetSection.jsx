// import React from "react";
// import { image } from "../../assets/image";
// import { useState } from "react";
// import "./MyBetSection.css";
// import MyBetSectionCard from "../MyBetSectionCard/MyBetSectionCard";
// import data from "../../dataa";
// import MyBetSectionDetails from "../MyBetSectionDetails/MyBetSectionDetails";

// function MyBetSection() {
//   const [betData, setBetData] = useState(data);
//   console.log("betdata", betData);
//   const [openModal, setOpenModal] = useState(false);

//   const navigate = useNavigate();

//
//   return (
//     <>
//       <div className="myBetContainer">
//         <div className="myBetNavBar">
//           <div
//             className="backIconContainer"
//             onClick={() => setOpenModal(false)}
//
//           >
//             <div className="backIcon">{image.backButton}</div>
//             <div>
//               <strong>Back</strong>
//             </div>
//           </div>
//           <div className="reload">
//             <div className="reloadIcon">{image.reload}</div>
//           </div>
//         </div>
//         <div
//           className="all-cards"
//           style={{ display: openModal ? "none" : "block" }}
//         >
//           {betData.map((bData) => {
//             return (
//               <MyBetSectionCard
//                 key={bData.id}
//                 bData={bData}
//                 openModal={openModal}
//                 setOpenModal={setOpenModal}
//               ></MyBetSectionCard>
//             );
//           })}
//         </div>
//         {openModal && <MyBetSectionDetails />}
//       </div>
//     </>
//   );
// }

// export default MyBetSection;

import React from "react";
import { image } from "../../assets/image";
import { useState, useEffect } from "react";
import {socket} from '../../utils/newSocket'
import "./MyBetSection.css";
import MyBetSectionCard from "../MyBetSectionCard/MyBetSectionCard";
import data from "../../dataa";
import MyBetSectionDetails from "../MyBetSectionDetails/MyBetSectionDetails";
import { useNavigate } from "react-router-dom";
import { getCaller } from "../../utils/api";

function MyBetSection({ info, myBetSectionModel, setMyBetSectionModel, oneCashout }) {
  const [betData, setBetData] = useState(data);
  const [myBetDetailsModel, setMyBetDetailsModel] = useState(false);
  const [myBetData, setMyBetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [crashedData, setCrashedData] = useState([]);
  const [singleBetdata, setSingleBetData] = useState([])
  // console.log("Info ",info?.id)
  // console.log("info op", info?.operator_id)

  const handleMyBet = async () => {
    const res = await getCaller(
      `mybets?userId=${info?.id}&operator_id=${info?.operator_id}&limit=20`
    );
    const newMyBet = res?.data;
    
    setMyBetData(newMyBet);
    setLoading(false);
  };

  useEffect(() => {
    handleMyBet();
    const handleCrashedData = (data) => {
      try {
        setCrashedData(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    socket.on("crashed", handleCrashedData);
    return () => {
      socket.off("crashed", handleCrashedData);
    };
  }, []);
  useEffect(() => {
    if (oneCashout || crashedData) {
      handleMyBet();
    }
  }, [oneCashout, crashedData]);

  // console.log("MyBetdata",myBetData)

  const handleMyBetsDetails = (data) => {
    setSingleBetData(data)
    setMyBetDetailsModel((prv) => !prv);
  };

  // console.log('Single', singleBetdata)

  return (
    <>
      {!myBetDetailsModel && (
        <div className="myBetContainer">
          <div className="myBetNavBar">
            <div className="backIconContainer">
              <div className="backIcon">{image.backButton}</div>

              <div>
                <strong onClick={() => setMyBetSectionModel((prv) => !prv)}>
                  Back
                </strong>
              </div>
            </div>
            <div className="reload">
              <div className="reloadIcon">{image.reload}</div>
            </div>
          </div>

          <div
            className="all-cards"
            // style={{ display: openModal ? "none" : "block" }}
          >
            {myBetData.map((bData) => (
              <MyBetSectionCard
                key={bData.id}
                bData={bData}
                onClick={() => handleMyBetsDetails(bData)}
                // openModal={openModal}
                // setOpenModal={setOpenModal}
              />
            ))}
          </div>

          {/* {openModal && <MyBetSectionDetails />} */}
        </div>
      )}
      {myBetDetailsModel && (
        <MyBetSectionDetails
          singleBetdata={singleBetdata}
          myBetDetailsModel={myBetDetailsModel}
          setMyBetDetailsModel={setMyBetDetailsModel}
        ></MyBetSectionDetails>
      )}
    </>
  );
}

export default MyBetSection;
