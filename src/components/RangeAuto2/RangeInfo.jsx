import React, { useState } from "react";
import "./range.css";
const RangeInfo = () => {
  const [rangeValue, setRangeValue] = useState(0); // Default value for the range slider

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  };

  return (
    <div className="range1">
      <span>Chashout at</span>
      <div className="range2">
        <div className="range-border">
          <div className="rInput-x">
            <input
              type="range"
              min="1.7"
              max="100"
              className="range-input"
              value={rangeValue}
              onChange={handleRangeChange}
            />
            <span>X</span>
          </div>
          <div className="range-font">
            <label>
              <span>{rangeValue}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeInfo;
