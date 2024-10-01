
import React from "react";
import './modal.css';
import { image } from "../../assets/image";

function Modal({ isOpen, onClose,  maxOdds }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        {/* {children}  */}
        <div className="popup-container">
          <div className="closePopup">
            <h1 style={{ fontSize: "18px", color: "white", paddingTop:"5px" }}>Last 30 Rounds</h1>
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>

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
      </div>
    </div>
  );
}

export default Modal;
