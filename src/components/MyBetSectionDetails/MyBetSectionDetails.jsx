import React from "react";
import "./MyBetSectionDetails.css";
import { image } from "../../assets/image";
// import { useNavigate } from "react-router-dom";

function MyBetSectionDetails({
  setMyBetDetailsModel,
  myBetDetailsModel,
  singleBetdata,
}) {
  // const navigate = useNavigate();
  // const handleBackBet = () => {
  //   navigate("/my-bets");
  // };
  return (
    <div className="container">
      <div className="myBetNavBar-2">
        <div className="backIconContainer-2">
          <div className="backIcon-2">{image.backButton}</div>

          <div>
            <strong onClick={() => setMyBetDetailsModel((prv) => !prv)}>
              Back
            </strong>
          </div>
        </div>
      </div>

      <div className="data-item-container">
        <div className="data-item">
          <div className="label">Bet Id</div>
          <div className="value-container">
            <span className="value">{singleBetdata.lobby_id}</span>
            <button className="copy-button">Copy</button>
          </div>
        </div>
        <div className="data-item">
          <div className="label">Round Id</div>
          <div className="value-container">
            <span className="value">84064625</span>
            <button className="copy-button">Copy</button>
          </div>
        </div>
        <div className="data-item">
          <div className="label">Server Seed</div>
          <div className="value-container">
            <span className="value">6209cd9</span>
            <button className="copy-button">Copy</button>
          </div>
        </div>
        <div className="data-item">
          <div className="label">Player Seed</div>
          <div className="value-container">
            <div>
              <span className="seed-label-player seed-lable-gap">Player 1</span>
              <span className="value">1725025595964</span>
            </div>
            <button className="copy-button">Copy</button>
          </div>
          <div className="value-container">
            <div>
              <span className="seed-label-player seed-lable-gap">Player 2</span>
              <span className="value">1725025595756</span>
            </div>
            <button className="copy-button">Copy</button>
          </div>
          <div className="value-container">
            <div>
              <span className="seed-label-player seed-lable-gap">Player 3</span>
              <span className="value">1725025597496</span>
            </div>
            <button className="copy-button">Copy</button>
          </div>
        </div>
        <div className="data-item">
          <div className="label">Combined SHA512 Hash</div>
          <div className="value-container">
            <span className="value-long">
              52a88ebed3034c6b71022c5b519fa9eala8363f4935b8de86b9675324e8
            </span>
            <button className="copy-button">Copy</button>
          </div>
          <div className="value-container">
            <div className="v-container">
              <div className="seed-label-player">Substring</div>
              <span className="value">52a88ebe</span>
            </div>
            <button className="copy-button">Copy</button>
          </div>
          <div className="value-container">
            <div className="v-container">
              <div className="seed-label-player">Dec</div>
              <span className="value">1386778302</span>
            </div>
            <button className="copy-button">Copy</button>
          </div>
          <div className="value-container">
            <div className="v-container">
              <div className="seed-label-player">Odd</div>
              <span className="value">2.94</span>
            </div>
            <button className="copy-button">Copy</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyBetSectionDetails;
