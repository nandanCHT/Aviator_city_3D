import React, { useState } from "react";
import { image } from "../../../assets/image";
import "./CursorPointer.css";

function CursorPointer() {
  // State to track dropdown visibility
  const [showValues, setShowValues] = useState(false);

  // State to track active button in the RoundsButtonGroup
  const [activeButton, setActiveButton] = useState(null);

  // State for individual input values
  const [winMoreThan, setWinMoreThan] = useState(0);
  const [loseMoreThan, setLoseMoreThan] = useState(0);
  const [singleWinExceed, setSingleWinExceed] = useState(0);

  // Toggle dropdown visibility
  const handleClick = () => {
    setShowValues(!showValues);
  };

  // Close dropdown on cut button or headerbar click
  const handleCutClick = () => {
    setShowValues(false);
  };

  // Handle button click and set active button for green border
  const handleButtonClick = (value) => {
    setActiveButton(value);
  };

  return (
    <div className="" style={{}}>
      {/* Main Button */}
      <div onClick={handleClick} className="dotButoon">
        {image.Dots}
      </div>

      {showValues && (
        <div className="cursorMain">
          <div style={{ padding: ".75rem" }}>
            <div
              className="headerbar"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16rem",
                minHeight: "4.5rem",
                cursor: "pointer", // Add a pointer cursor to indicate clickability
              }}
              onClick={handleCutClick} // Close dropdown on headerbar click
            >
              <div style={{ display: "flex", gap: "2rem" }}>
                <div className="roundedBorder">
                  <span>1</span>
                </div>
                <div style={{ marginTop: "14px", fontSize: "18px" }}>
                  <p>Advanced Autobet Settings</p>
                </div>
              </div>
              <div style={{ justifyItems: "end" }}>
                <p className="crossButoon" onClick={handleCutClick}>
                  {image.cutbutton}
                </p>
              </div>
            </div>

            {/* Rounds Section */}
            <div
              style={{
                borderTop: "2px solid #9196a5",
                minHeight: "6rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", gap: ".75rem" }}>
                <span
                  style={{
                    marginTop: "1rem",
                    fontSize: "20px",
                    opacity: "0.7",
                  }}
                >
                  Rounds
                </span>

                {["10", "20", "50", "80", image.infinite].map((value) => (
                  <button
                    key={value}
                    className="roundedBorder-btn"
                    onClick={() => handleButtonClick(value)}
                    style={{
                      borderColor:
                        activeButton === value ? "#22c55e" : "initial",
                      borderWidth: activeButton === value ? "4px" : "1px",
                    }}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            {/* Win more than */}
            <div className="winlos">
              <p className="WinMoreLose">Win more than</p>
              <div className="coin1">
                {image.coin}
                <input
                  type="values"
                  inputMode="numeric"
                  value={winMoreThan}
                  onChange={(e) => setWinMoreThan(e.target.value)}
                  onInput={(e) => {
                    const value = e.target.value;
                    if (!/^\d*$/.test(value)) {
                      e.target.value = value.slice(0, -1); // Remove the last non-numeric character
                    }
                  }}
                  className="input-putSection"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Lose more than */}
            <div className="winlos">
              <p className="WinMoreLose">Lose more than</p>
              <div className="coin1">
                {image.coin}
                <input
                  type="values"
                  inputMode="numeric"
                  value={loseMoreThan}
                  onChange={(e) => setLoseMoreThan(e.target.value)}
                  onInput={(e) => {
                    const value = e.target.value;
                    if (!/^\d*$/.test(value)) {
                      e.target.value = value.slice(0, -1); // Remove the last non-numeric character
                    }
                  }}
                  className="input-putSection"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Single win exceed */}
            <div className="winlos">
              <p className="WinMoreLose">Single win exceed</p>
              <div className="coin1">
                {image.coin}
                <input
                  type="values"
                  inputMode="numeric"
                  value={singleWinExceed}
                  onChange={(e) => setSingleWinExceed(e.target.value)}
                  onInput={(e) => {
                    const value = e.target.value;
                    if (!/^\d*$/.test(value)) {
                      e.target.value = value.slice(0, -1); // Remove the last non-numeric character
                    }
                  }}
                  className="input-putSection"
                  placeholder="0"
                />
              </div>
            </div>

            {/* submit */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={handleClick} className="submitbutton">
                Save
              </button>
            </div>

            {/* end */}
          </div>
        </div>
      )}
    </div>
  );
}

export default CursorPointer;
