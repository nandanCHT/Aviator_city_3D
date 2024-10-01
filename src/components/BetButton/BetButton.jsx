import React, { useEffect } from "react";
import "./BetButton.css";
// import {socket} from '../../utils/newSocket'
import { image } from "../../assets/image";
import { useState } from "react";

function BetButton({
  info,
  planeStatus,
  showCancel,
  endDelay,
  handlePlaceBet,
  handleCashout,
  cashoutData,
  nextRound,
  betData,
  betValue,
  isEdit,
  setIsEdit,
  betPlaced,
  showLock,
  setShowLock,
  setBetPlaced,
  showBetPlaced,
  setShowBetPlaced,
  amountMultiplier,
  index,
  handleNextClick,
  handleCancelBet,
  lockCancel,
  setLockCancel,
}) {
  // console.log("BetPalvced", betPlaced);
  // console.log("ShowCancel", showCancel)

  useEffect(() => {
    let timer;

    if (betPlaced) {
      if (Number(endDelay) <= 4) {
        timer = setTimeout(() => {
          setShowBetPlaced(true);
          if (!lockCancel) {
            setShowLock(true);
          } else {
            setShowLock(false);
          }
        }, 3000);
      } else {
        setShowBetPlaced(true);
        setShowLock(true);
      }
    }

    // Cleanup the timeout if the component unmounts or betPlaced changes
    return () => {
      clearTimeout(timer);
    };
  }, [betPlaced]);

  return (
    <div>
      {!isEdit &&
        (info?.balance > 100 ? (
          <div>
            {planeStatus == 0 && !showCancel ? (
              <div
                class
                style={{ width: "100%", margin: "4px 0px", display: "flex" }}
              >
                <button
                  disabled={planeStatus == 0 && Number(endDelay) >= 6}
                  onClick={() => handlePlaceBet(index)}
                  className="submit-button"
                  type="button"
                >
                  <span>Place Bet</span>
                </button>
              </div>
            ) : planeStatus == 0 && showCancel ? (
              <div>
                {showBetPlaced ? (
                  <div
                    style={{
                      width: "100%",
                      margin: "4px 0px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <button className="Bet-placed" type="button">
                      <div className="cash-out-2">
                        <div>Bet Placed </div>

                        <div style={{ marginTop: "5px" }}>{image.coin}</div>
                        <div>{betValue}</div>
                      </div>
                    </button>
                  </div>
                ) : (
                  <div>
                    <div
                      style={{
                        width: "100%",
                        margin: "4px 0px",
                        display: "flex",
                      }}
                    >
                      <button
                        disabled={planeStatus == 0 && Number(endDelay) >= 6}
                        onClick={() => handleCancelBet(index)}
                        className="cancel-button"
                        type="button"
                      >
                        <span>Cancel Bet</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
            {planeStatus == 1 && !betData?.length ? (
              <>
                {nextRound ? (
                  <div>
                    <div
                      style={{
                        width: "100%",
                        margin: "4px 0px",
                        display: "flex",
                      }}
                    >
                      <button
                        onClick={() => handleCancelBet(index)}
                        className="cancel-button"
                        type="button"
                      >
                        
                        <span>Cancel Bet</span>
                      </button>
                    </div>
                    <div className="wating-round">Wating for next round</div>
                  </div>
                ) : (
                  <div
                    style={{
                      width: "100%",
                      margin: "4px 0px",
                      display: "flex",
                    }}
                  >
                    <button
                      onClick={() => handleNextClick(index)}
                      className="submit-button"
                      type="button"
                    >
                      <span>Next Bet</span>
                    </button>
                  </div>
                )}
              </>
            ) : null}

            {planeStatus == 1 && betData?.length && showCancel ? (
              <div
                style={{
                  width: "100%",
                  margin: "4px 0px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => handleCashout(index)}
                  className="cash-out"
                  type="button"
                >
                  <div className="cash-out-2">
                    <div>Cashout </div>
                    <div style={{ marginTop: "5px" }}>{image.coin}</div>
                    <div>{amountMultiplier?.toFixed(2)}</div>
                  </div>
                </button>
              </div>
            ) : null}

            {planeStatus == 2 ||
            (planeStatus == 1 && betData?.length && !showCancel) ? (
              <>
                {nextRound ? (
                  <div>
                    <div
                      style={{
                        width: "100%",
                        margin: "4px 0px",
                        display: "flex",
                      }}
                    >
                      <button
                        onClick={() => handleCancelBet(index)}
                        className="cancel-button"
                        type="button"
                      >
                        <span>Cancel Bet</span>
                      </button>
                    </div>
                    <div className="wating-round">Wating for next round</div>
                  </div>
                ) : (
                  <div
                    style={{
                      width: "100%",
                      margin: "4px 0px",
                      display: "flex",
                    }}
                  >
                    <button
                      onClick={() => handleNextClick(index)}
                      className="submit-button"
                      type="button"
                    >
                      <span>Next Bet</span>
                    </button>
                  </div>
                )}
              </>
            ) : null}
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              margin: "4px 0px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <button className="no-balance" type="button">
              <div className="cash-out-2">
                <div>Insufficient Balance </div>
              </div>
            </button>
          </div>
        ))}
    </div>
  );
}

export default BetButton;
