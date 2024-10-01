import React, { useState } from "react";
import "./index.css";
import { FaHome } from "react-icons/fa";
import { image } from "../../assets/image";
import { FiMenu } from "react-icons/fi";
import RoundPopUp from "./RoundPopUp";
import Modal from "../modal/Modal";
import MenuPopup from "./MenuPopup"; // Import the MenuPopup component
import columnData from "../../data";
import { formatBalance } from "../../utils/helper";

function NavBar({ info, maxOdds, setMyBetSectionModel, myBetSectionModel }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for MenuPopup

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // console.log("MaxOdd", maxOdds)

  return (
    <>
      <div className="nav-container">
        <div className="nabvar">
          <div className="homeIcon">
            <div className="homeIconImage">{image.home}</div>
            <div className="avi-section">
              <p>Aviator 3D</p>
            </div>
          </div>
          <div className="menu-section">
            <div className="user-button">
              <p style={{ fontSize: "13px", marginTop: "3.5px" }}>
                {info.name}
              </p>
              <p>{image.lotusIcon}</p>
              <p
                style={{ color: "#22c55e", fontSize: "15px", marginTop: "2px" }}
              >
                {formatBalance(info?.balance)
                  ? formatBalance(info?.balance)
                  : "00.00"}
              </p>
            </div>
            <button className="menu">
              <p onClick={toggleMenu}>
                <FiMenu />
              </p>
            </button>
          </div>
        </div>
        <div className="history">
          <div className="history-btn-container">
            <button className="historybtn" onClick={toggleModal}>
              <p>{image.HistoryWatch}</p>
              <p className="hsName">History</p>
              <p>{image.Arrow}</p>
            </button>
          </div>

          <div className="slider-section">
            {maxOdds.map((item, index) => (
              <div className="colom" key={index}>
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

          <div className="square "></div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        maxOdds={maxOdds}
      ></Modal>
      <MenuPopup
        myBetSectionModel={myBetSectionModel}
        setMyBetSectionModel={setMyBetSectionModel}
        isOpen={isMenuOpen}
        onClose={toggleMenu}
      />
    </>
  );
}

export default NavBar;
