import React from "react";
import "./gameRule.css";

const GameRule = () => {
  return (
    <>
      <div className="main-gameRule">
        <div className="text-gameRule">
          <p>Game Rules</p>
        </div>
        <div className="rules-card">
          <p className="deshboard-rocket">1. Make your bet before takeoff.</p>
        </div>
        <div className="rules-card">
          <p className="deshboard-rocket">
            2. Users can not cancel their bets after takeoff.
          </p>
        </div>
        <div className="rules-card">
          <p className="deshboard-rocket">
            3. Any bets placed after takeoff will be placed in the next round.
          </p>
        </div>
        <div className="rules-card">
          <p className="deshboard-rocket">
            4. Cashouts can only be done for active bets while the flight is
            still in air.
          </p>
        </div>
      </div>
    </>
  );
};

export default GameRule;
