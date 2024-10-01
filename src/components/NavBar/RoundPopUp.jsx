import React from "react";
import columnData from "../../data";
import { image } from "../../assets/image";

const RoundPopUp = ({ maxOdds, setRoundPopUp }) => {
  const sortedData = columnData.sort((a, b) => a.value - b.value);

  return (
    <div className="popup-container">
      <h1 style={{ fontSize: "18px", color: "white" }}>Last 30 Rounds</h1>

      <div className="home-container">
        {maxOdds.map((item, index) => (
          <div className="column" key={index}>
            <span
              className={
                item.max_mult >= 10
                  ? "historyNum-new-yellow"
                  : item.max_mult >= 2
                  ? "historyNum-new"
                  : "historyNum-new-Red"
              }
            >
              {item.max_mult >= 10 ? (
                <>
                  <div>{image.winQueen}</div>
                  {item.max_mult}
                </>
              ) : (
                item.max_mult
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoundPopUp;
