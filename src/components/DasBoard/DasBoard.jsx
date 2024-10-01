import React, { useState, useEffect, useCallback } from "react";
import { socket } from "../../utils/newSocket";
import "./DasBoard.css";
import { image } from "../../assets/image";
import { FaPlus } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { HiOutlineMinus } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { formatBalance } from "../../utils/helper";
import BetButton from "../BetButton/BetButton";

function DasBoard({
  info,
  planeData,
  queryParams,
  index,
  betButton,
  onBetPlace,
  onCashout,
  onSingleCashData,
  toastMessage,
  setToastMessage,
  toastColor,
  setToastColor,
}) {
  const [betValue, setBetValue] = useState("100");
  const [inputValue, setInputValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [buttonValues, setButtonValues] = useState([100, 500, 1000, 2000]);
  // const [buttonValues, setButtonValues] = useState(
  //   JSON.parse(localStorage.getItem("buttonValues")) || [100, 500, 1000, 2000]
  // ); // #1 Get buttonValues from localStorage if available

  const [isValidAmount, setIsValidAmount] = useState(false);
  const [isWarning, setIsWarning] = useState(true);
  const [autoMultiplier, setAutoMultiplier] = useState("1.01");

  const [openModal, setOpenModal] = useState([]);
  const [showCancel, setShowCancel] = useState(false);
  const [nextRound, setNextRound] = useState(false);
  const [betData, setBetData] = useState([]);
  const [cashoutData, setCashoutData] = useState([]);
  const [oneCashout, setOneCashout] = useState([]);
  const [showBalance, setShowBalace] = useState(false);
  const [messageEmitted, setMessageEmitted] = useState(false);
  const [messageEmittedBet, setMessageEmittedBet] = useState(false);
  const [betPlaced, setBetPlaced] = useState(false);
  const [showBetPlaced, setShowBetPlaced] = useState(false);
  const [showLock, setShowLock] = useState(false);
  const [lockCancel, setLockCancel] = useState(false);
  const [autoBet, setAutoBet] = useState(false);
  const [autoCash, setAutoCash] = useState(false);

  const parsedBetData = planeData?.length > 0 ? planeData.split(":") : null;
  const planeStatus = parsedBetData?.length > 0 ? parsedBetData[2] : 0;
  const planeMultiplier = parsedBetData?.length > 0 ? parsedBetData[1] : 0;
  const endDelay = parsedBetData?.length > 0 ? parsedBetData[1] : 0;
  const userAmount = Number(info.balance);

  const amountMultiplier = betValue * planeMultiplier;
  // console.log("Single cash out", onSingleCashData)
  // console.log("OneCashOut", oneCashout)

  //Function
  useEffect(() => {
    if (autoBet) {
      if (planeStatus == 0) {
        handlePlaceBet(index);
        setNextRound(false);
      }
    } else if (planeStatus == 0 && nextRound) {
      handlePlaceBet(index);
      setNextRound(false);
    }
  }, [planeStatus, autoBet, cashoutData, showCancel, betData]);

  // useEffect(() => {
  //   localStorage.setItem("buttonValues", JSON.stringify(buttonValues));
  // }, [buttonValues]); // #2 Store buttonValues to localStorage whenever they change

  useEffect(() => {
    if (
      planeStatus == 1 &&
      betData?.length &&
      showCancel &&
      parseFloat(planeMultiplier) >= parseFloat(autoMultiplier) &&
      autoCash
    ) {
      handleCashout(index);
    }
  }, [
    planeMultiplier,
    autoCash,
    planeStatus,
    autoMultiplier,
    betData,
    showCancel,
  ]);

  useEffect(() => {
    // plane status 2 then reset bet and cashout
    if (planeStatus == 2) {
      const timer = setTimeout(() => {
        setBetData([]);
        setCashoutData([]);
        setOneCashout([]);
        onSingleCashData([]);
        setOpenModal([]);
        setShowCancel(false);
        setBetPlaced(false);
        setShowBetPlaced(false);
        setLockCancel(false);
        onBetPlace([]);
        onCashout([]);
        setMessageEmitted(false);
        setMessageEmittedBet(false);
      }, 5000);
      if (planeStatus == 2) {
        setShowLock(false);
      }
      return () => {
        socket.off("bet");
        socket.off("cashout");
        socket.off("singleCashout");
        clearTimeout(timer);
      };
    }
  }, [planeStatus]);

  useEffect(() => {
    const handleBet = (data) => {
      try {
        setBetData(data);
        onBetPlace(data);
      } catch (err) {
        console.error(err);
      }
    };
    // Listen for "bet" event
    socket.on("bet", handleBet);
    // Cleanup on component unmount
  }, [onBetPlace, betData]);

  const handlePlaceBet = () => {
    if (messageEmittedBet) return;
    const endDelayNumber = Number(endDelay);

    if (
      (planeStatus == 0 && Number(betValue) > info.balance) ||
      Number(betValue) === 0
    ) {
      return setShowBalace(true);
    }
    setShowCancel(true);
    setToastMessage("Bet Placed Successfully!");
    setToastColor("#28a745");

    // Emit the bet message
    const autoValue = autoCash ? autoMultiplier : null;
    socket.emit(
      "message",
      `BT:PB:${planeData}:${info.id}:${info.operator_id}:${queryParams.id}:${queryParams.game_id}:${autoValue}:${betValue}:${index}`
    );
    setBetPlaced(true);
    setMessageEmittedBet(true);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleNextClick = (clickedIndex) => {
    if (Number(betValue) > info.balance || Number(betValue) === 0) {
      return setShowBalace(true);
    }
    planeData.split(" : ");
    let a = planeData?.split(":");
    a.pop();
    a.push("0");
    let b = a.join(":");
    setNextRound(true);
  };

  useEffect(() => {
    const handleCashoutData = (data) => {
      try {
        setCashoutData(data);
        onCashout(data);
      } catch (err) {
        console.error("Cashout data parsing error:", err);
      }
    };
    if (socket.listeners("cashout").length == 0) {
      socket.on("cashout", handleCashoutData);
    }
  }, [onCashout, cashoutData]);

  const handleCashout = (clickedIndex) => {
    if (messageEmitted) return;
    setShowCancel(false);
    setMessageEmitted(false);
    setMessageEmittedBet(false);
    setShowLock(false);
    const bet = betData.find((x) => {
      const betIdParts = x.bet_id.split(":");
      const betIndex = betIdParts[5];
      return index == betIndex && info.id === x?.bet_id?.split(":")[3];
    });
    // console.log("Bet", bet);

    if (bet) {
      let autoValue =
        parseFloat(autoMultiplier) > parseFloat(planeMultiplier)
          ? null
          : autoMultiplier;
      let newValue = autoCash ? autoValue : null;
      socket.emit(
        "message",
        `BT:CO:${planeMultiplier}:${planeStatus}:${newValue}:${bet.bet_id}`
      );
      // console.log("Bet", bet);
      setMessageEmitted(true); // Set messageEmitted to true

      const handleSingleCashout = (data) => {
        try {
          setOneCashout(data);
          onSingleCashData(data);
          setOpenModal((prev) => [...prev, { bet_id: bet.bet_id, show: true }]);

          // if (data) {
          //     playCashoutSound();
          // }
        } catch (err) {
          console.error("Single cashout data parsing error:", err);
        }
      };
      if (socket.listeners("singleCashout").length == 0) {
        socket.on("singleCashout", handleSingleCashout);
      } else {
        console.log("singleCashout");
      }
    }
    setToastMessage("CashOut Successfully!");
    setToastColor("#28a745");

    setNextRound(false);
    setCashoutData("");
    onCashout("");
    setOneCashout("");
    setTimeout(() => setToastMessage(""), 3000);

    // if (autoBet && clickedIndex == index) {
    //   handleNextClick(index);
    // }
  };

  const handleCancelBet = () => {
    setShowCancel(false);
    // setAutoBet(false);
    setLockCancel(true);
    setMessageEmitted(false);
    setMessageEmittedBet(false);
    setNextRound(false);

    betData?.length > 0 &&
      betData?.forEach((x) => {
        if (
          index == x?.bet_id?.split(":")[5] &&
          info.id === x?.bet_id?.split(":")[3]
        ) {
          socket.emit("message", `BT:CB:${planeStatus}:${x.bet_id}`);
          setBetData([]);
          onBetPlace("");
          return;
        }
      });
  };

  //

  const handleSliderChange = (event) => {
    const newValue = parseFloat(event.target.value).toFixed(2);
    setAutoMultiplier(newValue);
  };

  const handleMinusClick = () => {
    setBetValue((prevValue) => Math.max(100, prevValue - 50));
  };

  const handlePlusClick = () => {
    setBetValue((prevValue) => prevValue + 50);
  };

  const handleButtonClick = (buttonValue) => {
    setBetValue((prevValue) => Number(prevValue) + buttonValue);
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    const floatPattern = /^\d*\.?\d*$/;

    if (floatPattern.test(newValue)) {
      const numericValue = Number(newValue);
      if (newValue.length === 0) {
        setBetValue("");
      } else if (
        (newValue[0] !== "0" || newValue === "0") &&
        newValue.length <= 10 &&
        numericValue <= 20000
      ) {
        setBetValue(newValue);
      }
    }
  };

  const handleInputFocus = (event) => {
    event.target.select();
  };

  const handleInputKeyDown = (event) => {
    if (event.key === " ") {
      setBetValue("");
    }
  };

  const resetValue = () => {
    setBetValue(betValue);
  };

  const handleMax = () => {
    setBetValue(10000);
  };

  const handleReset = () => {
    setBetValue(100);
  };

  const handleEdit = () => {
    setIsEdit((prevIsEdit) => !prevIsEdit);
    setIsValidAmount((preveIsValid) => !preveIsValid);
  };

  const inputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const numericValue = Number(value);
      setInputValue(numericValue);
      setIsWarning(false);
      if (numericValue >= 100 && numericValue <= 200000) {
        setIsValidAmount(false);
      } else {
        setIsValidAmount(true);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const newValue = Number(inputValue);

      if (
        !buttonValues.includes(newValue) &&
        newValue > 0 &&
        newValue >= 100 &&
        newValue <= 200000
      ) {
        // console.log("Adding new value:", newValue);
        setButtonValues((prevButtonValues) => [...prevButtonValues, newValue]);
      }

      // console.log("Button values before update:", buttonValues);

      setInputValue("");
    }
  };

  const addStake = () => {
    const newValue = Number(inputValue);

    if (
      !buttonValues.includes(newValue) &&
      newValue > 0 &&
      newValue >= 100 &&
      newValue <= 200000
    ) {
      // console.log("Adding new value:", newValue);
      setButtonValues((prevButtonValues) => [...prevButtonValues, newValue]);
    }

    // console.log("Button values before update:", buttonValues);

    setInputValue("");
  };

  const handleDeleteButtonClick = (buttonValue) => {
    setButtonValues((prevButtonValues) =>
      prevButtonValues.filter((value) => value !== buttonValue)
    );
  };

  const handlerOnBlur = (event) => {
    let numericValue = event.target.value;
    if (isNaN(numericValue) || numericValue === "") {
      numericValue = 100;
    } else {
      // Ensure the value is within the specified range
      if (numericValue < 100) {
        numericValue = 100;
      } else if (numericValue > betValue) {
        numericValue = betValue;
      }
    }
    setBetValue(numericValue);
  };

  // const autoBetToggle = (value) => {
  //   // console.log("Value", value);
  //   // setAutoBet(true);

  //   // if (autoBet) {
  //   //   if (planeStatus == 1 && betData?.length > 0) {
  //   //     setAutoBet(false);
  //   //   } else {
  //   //     handleCancelBet();
  //   //   }
  //   // }
  //   setAutoBet(!autoBet)
  //  setToastMessage(autoBet ? "AutoBet is off" : "AutoBet is on");
  //   setTimeout(() => setToastMessage(""), 3000);
  // };

  const autoBetToggle = useCallback(() => {
    let newAutoBetState = !autoBet;
    setAutoBet(newAutoBetState);

    if (newAutoBetState) {
      setToastMessage("Auto Betting is on!");
      setToastColor("#28a745");
    } else {
      setToastMessage("Auto Betting is off!");
      setToastColor("#fd7e14");
    }

    setTimeout(() => setToastMessage(""), 3000);
  }, [autoBet]);

  const handleAutoCashMultiplier = (event) => {
    let inputValue = event.target.value;
    const match = inputValue.match(/^\d{0,3}(\.\d{0,2})?/);
    if (match) {
      inputValue = match[0];
      if (parseFloat(inputValue) > 100) {
        inputValue = "100.00";
      }
      setAutoMultiplier(inputValue);
    }
  };

  const handleAutoCashMultiplierBlur = (e) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value) || value < 1.01) {
      setAutoMultiplier("1.01");
    } else if (value > 100) {
      setAutoMultiplier("100.00");
    } else {
      setAutoMultiplier(value.toFixed(2).toString());
    }
  };

  const autoCashToggle = (value) => {
    if (value == "autoCash") {
      setAutoCash(!autoCash);
    }
    if (!autoCash) {
      setToastMessage("Autocash out is on");
      setToastColor("#28a745");
    } else {
      setToastMessage("Autocash out is off");
      setToastColor("#fd7e14");
    }

    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div className="dash-section">
      <div className="brdiv">
        <div className="button-section">
          <div className="bet-input-section">
            <div className="bt">
              <button onClick={handleMinusClick} className="minus-button">
                <HiOutlineMinus />
              </button>
              <input
                type="text"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                // onKeyDown={handleInputKeyDown}
                onBlur={handlerOnBlur}
                className="value-input"
                value={betValue}
              />
              <button onClick={handlePlusClick} className="plus-button">
                <GoPlus />
              </button>
            </div>
            {showLock && <div className="after-bet">{image.lockIcon}</div>}
            <div className="other-bt">
              {isEdit && (
                <div className="btn">
                  {buttonValues.map((buttonValue, index) => (
                    <button className="button-fp" key={index}>
                      <span>
                        <div
                          className="deleteIconBack"
                          onClick={() => handleDeleteButtonClick(buttonValue)}
                        >
                          <RiDeleteBinLine />
                        </div>
                      </span>
                      <span className="text-base1"> {buttonValue}</span>
                    </button>
                  ))}
                </div>
              )}
              {!isEdit && (
                <div className="btn-change">
                  {buttonValues.map((buttonValue) => (
                    <button
                      className="button-fp"
                      key={buttonValue}
                      onClick={() => handleButtonClick(buttonValue)}
                    >
                      <span className="text-base">
                        <FaPlus />
                      </span>
                      <span className="text-base1"> {buttonValue}</span>
                    </button>
                  ))}
                </div>
              )}
              {!isEdit && (
                <div className="MaxResetEdit">
                  <>
                    <button className=" max-button" onClick={handleMax}>
                      <span>Max</span>
                    </button>
                    <button className=" reset-button" onClick={handleReset}>
                      <span>Reset</span>
                    </button>
                  </>
                  <div>
                    <button className=" btn-Edit" onClick={handleEdit}>
                      {image.edit_button}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <BetButton
            info={info}
            planeStatus={planeStatus}
            showCancel={showCancel}
            endDelay={endDelay}
            handlePlaceBet={handlePlaceBet}
            handleCashout={handleCashout}
            nextRound={nextRound}
            betData={betData}
            betValue={betValue}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            betPlaced={betPlaced}
            setBetPlaced={setBetPlaced}
            amountMultiplier={amountMultiplier}
            index={index}
            handleNextClick={handleNextClick}
            handleCancelBet={handleCancelBet}
            showBetPlaced={showBetPlaced}
            setShowBetPlaced={setShowBetPlaced}
            cashoutData={cashoutData}
            showLock={showLock}
            setShowLock={setShowLock}
            lockCancel={lockCancel}
            setLockCancel={setLockCancel}
          ></BetButton>

          {isEdit && (
            <div className="edit_inputtag">
              <div className="input-wrapper">
                <span className="input-coin">{image.coin}</span>
                <input
                  onKeyDown={handleKeyDown}
                  onChange={inputChange}
                  type="text"
                  className="edit-input"
                  value={inputValue}
                />
                {!isValidAmount && (
                  <button
                    className="betSave"
                    onClick={() => {
                      addStake();
                      setIsValidAmount(true);
                    }}
                  >
                    Add Stake
                  </button>
                )}
              </div>
              <button
                className="save-button"
                style={{
                  backgroundColor: "#22c55e",
                }}
                onClick={() => {
                  handleEdit();
                  addStake();
                  setIsWarning(true);
                }}
              >
                <span className="saveLogo">{image.saveImage}</span>
                <span>Save</span>
              </button>
              {!isWarning && (
                <div className="amountBetween">
                  <p>Amount Between 100 to 20000</p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="doganbutton-main">
          <div className="doganbutton-slid" style={{ display: "flex" }}>
            <label className="switch">
              <input
                checked={autoBet}
                type="checkbox"
                className="Desh_Input"
                onChange={autoBetToggle}
                disabled={planeStatus == 0 && Number(endDelay) >= 6}
              />
              <span className="slider round"></span>
            </label>
            <p>Auto Bet </p>
          </div>
          <div
            className="doganbutton-slid"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <label className="switch">
              <input
                onChange={() => autoCashToggle("autoCash")}
                type="checkbox"
              />
              <span className="slider round"></span>
            </label>
            <p style={{ marginLeft: "8px" }}>Auto Cashout</p>
          </div>
        </div>

        {autoCash && (
          <div className="cashOut">
            <div className="CashOut-font">Cashout at</div>
            <div className="autoBet-container">
              <div className="autoBet-label">
                <span className="x">x</span>

                <input
                  type="text"
                  name=""
                  id=""
                  value={autoMultiplier}
                  onChange={(e) => handleAutoCashMultiplier(e)}
                  onKeyDown={(e) => {
                    if (
                      e.key === "e" ||
                      e.key === "E" ||
                      e.key === "+" ||
                      e.key === "-"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onBlur={(e) => handleAutoCashMultiplierBlur(e)}
                  className="cashOut-input"
                />
              </div>
              <input
                type="range"
                min="1.00"
                max="100.00"
                step="0.05"
                value={autoMultiplier}
                onChange={handleSliderChange}
                className="autoBet-slider"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DasBoard;
