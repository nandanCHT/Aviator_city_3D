import React from "react";
import { Link } from "react-router-dom";
import "./MenuPopup.css";

function MenuPopup({
  isOpen,
  onClose,
  myBetSectionModel,
  setMyBetSectionModel,
}) {
  if (!isOpen) return null;

  const handleMyBets = () => {
    setMyBetSectionModel((prv) => !prv);
  };
  const handlegaph = () => {
    setMyBetSectionModel((prv) => !prv);
  };

  return (
    <div className="menu-popup-overlay" onClick={onClose}>
      <div className="menu-popup" onClick={(e) => e.stopPropagation()}>
        <ul>
          <li style={{ color: "white", fontSize: "14px", fontWeight: "600" }}>
            Provably Fair
          </li>
          <li
            style={{ color: "white", fontSize: "14px", fontWeight: "600" }}
            onClick={() => handleMyBets()}
          >
            My Bets
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MenuPopup;
