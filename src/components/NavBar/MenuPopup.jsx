import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MenuPopup.css";
import ProvablyFairModal from "./ProvablyFairModal";

function MenuPopup({
  isOpen,
  onClose,
  myBetSectionModel,
  setMyBetSectionModel,
}) {
  const [isProvablyFairOpen, setIsProvablyFairOpen] = useState(false);

  if (!isOpen) return null;

  const handleMyBets = () => {
    setMyBetSectionModel((prv) => !prv);
  };

  const handleProvablyFair = () => {
    setIsProvablyFairOpen(true); // Open the Provably Fair modal
  };

  const closeProvablyFair = () => {
    setIsProvablyFairOpen(false); // Close the modal
  };

  return (
    <>
      <div className="menu-popup-overlay" onClick={onClose}>
        <div className="menu-popup" onClick={(e) => e.stopPropagation()}>
          <ul style={{ paddingTop: "4px" }}>
            <li
              style={{ color: "white", fontSize: "14px", fontWeight: "600" }}
              onClick={handleProvablyFair}
            >
              Provably Fair
            </li>
            <li
              style={{ color: "white", fontSize: "14px", fontWeight: "600" }}
              onClick={handleMyBets}
            >
              My Bets
            </li>
          </ul>
        </div>
      </div>

      {/* Provably Fair Modal */}
      <ProvablyFairModal isOpen={isProvablyFairOpen} onClose={closeProvablyFair} />
    </>
  );
}

export default MenuPopup;
