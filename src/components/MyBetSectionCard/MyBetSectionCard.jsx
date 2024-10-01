


import React from "react";
import { image } from "../../assets/image";
import "./MyBetSectionCard.css";

function MyBetSectionCard({ bData, onClick }) {
 
  const createdAt = new Date(bData.created_at);

  const date = createdAt.toISOString().split("T")[0]; 

 
  const formattedTime = createdAt.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <>
      <div className="card" onClick={onClick}>
        <div
          className={
            bData?.plane_status === "cashout"
              ? "cashout-label"
              : "cashout-label-loss"
          }
        >
          {bData?.plane_status === "cashout" ? "CASHOUT" : "CRASH"}
        </div>
        <div className="content">
          <div className="content-lable constent-specific">
            <span className="content-lable-name">Bet id :</span>{" "}
            <span className="content-lable-id">{bData.lobby_id}</span>
          </div>
          <div className="content-lable">
            <span className="content-lable-name">Round id :</span>{" "}
            <span className="content-lable-id">{bData.lobby_id}</span>
          </div>
          <div className="content-lable">
            <span className="content-lable-name">Date :</span>
            <span>
              <div>
                <span className="content-lable-specific">{date}</span>
               
                <span className="content-lable-time">{formattedTime}</span>
              </div>
            </span>
          </div>
          <div className="content-lable-changes">
            <span className="content-lable-name">Bet Amount :</span>
            <div className="coin">{image.coin}</div>
            <span className="content-lable-id">{bData.bet_amount}</span>
          </div>
          <div
            className={
              bData?.plane_status === "cashout"
                ? "card-footer"
                : "card-footer-loss"
            }
          >
            <div className="card-footer-content">
              <span className="content-lable-name">
                {bData?.plane_status === "cashout" ? "Profit" : "Loss"}
              </span>
              <span className="coin">{image.coin}</span>
              <span
                className={
                  bData?.plane_status === "cashout"
                    ? "content-lable-amount"
                    : "content-lable-amount-loss"
                }
              >
                {bData?.plane_status === "cashout"
                  ? bData.final_amount - bData.bet_amount
                  : bData.bet_amount}
              </span>
            </div>
            <div>
              <span className="content-lable-name">Multiplier</span>
              <span className="content-lable-multiplier">
                {bData.max_mult} x
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyBetSectionCard;
