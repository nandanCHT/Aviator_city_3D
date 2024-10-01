import React from "react";
import { useState, useEffect } from "react";
import { image } from "../../assets/image";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useLocation } from "react-router-dom";
// import MainDesBoard from "../MainDeshBoard/MainDesBoard";
import LuckyPlayers from "../LuckyPlayers/LuckyPlayers";
import { betButton } from "../../utils/staticData";
import DasBoard from "../DasBoard/DasBoard";

import GameRule from "../gameRules/gameRule";
import NavBar from "../NavBar/index";
import { socket } from "../../utils/newSocket";
import "./Home.css";
import Toast from "../Toast/Toast";
import MyBetSection from "../MyBetSection/MyBetSection";

function Home() {
  const [error, setError] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [planeData, setPlaneData] = useState({});
  const [numCards, setNumCards] = useState(2);
  const [maxOdds, setMaxOdds] = useState([]);
  const [betData, setBetData] = useState([]);
  const [cashoutData, setCashoutData] = useState([]);
  const [oneCashout, setOneCashout] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("");
  const [myBetSectionModel, setMyBetSectionModel] = useState(false);
  const [showBetDataTab, setShowBetDataTab] = useState(false)

  // console.log("onCashOut", oneCashout);
  // console.log("cashoutData", cashoutData)

  // console.log(error);
  // console.log("Socket Conected", socketConnected);
  // console.log("Info", info);
  // console.log("PlaneData", planeData);
  // console.log("BetData", betData)
  // console.log("OnCashoutdata", oneCashout);
  // console.log("Cashoutdata", cashoutData);
  // console.log("BetDataLength", betData.length)

  const { unityProvider, loadingProgression, sendMessage } = useUnityContext({
    loaderUrl: "/assets/Aviator3DCity.loader.js",
    dataUrl: "/assets/Aviator3DCity.data",
    frameworkUrl: "/assets/Aviator3DCity.framework.js",
    codeUrl: "/assets/Aviator3DCity.wasm",
  });

  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const location = useLocation();
  const rawQuery = location.search.substring(1);
  const decodedQuery = decodeURIComponent(rawQuery);
  // console.log("DecodeQuery", decodedQuery)

  let queryParams = {};
  try {
    queryParams = JSON.parse(
      '{"' + decodedQuery.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
      function (key, value) {
        return key === "" ? value : decodeURIComponent(value);
      }
    );
  } catch (e) {
    queryParams = {};
  }

  // console.log("QueryParams", queryParams);
  // console.log("PlaneData", planeData)
  useEffect(() => {
    const handleSocketEvents = () => {
      socket.on("connect", () => {
        setSocketConnected(true);
      });
      socket.on("disconnect", () => {
        setSocketConnected(false);
      });

      if (Object.keys(info)?.length === 0) {
        let userInfo = `PL:INFO:${queryParams?.id}:${queryParams.game_id}`;

        socket.emit("message", userInfo);
        socket.emit("message", "MXO");
        // socket.emit("message", "PL:PLAYERS");
      }
      socket.on("info", (data) => {
        setInfo(data);
        setLoading(false);
      });
      socket.on("plane", (data) => {
        setPlaneData(data);
      });

      socket.on("maxOdds", (data) => {
        try {
          setMaxOdds(data);
        } catch (err) {
          console.error(err);
        }
      });

      return () => {
        {
          /*
          if (socket && socket.connected) {
          socket.off("disconnect");
        } */
        }
        socket.off("connect");
        socket.off("disconnect");
        socket.off("info");
        socket.off("plane");
      };
    };
    handleSocketEvents();
  }, [queryParams?.id, error]);

  const onBetPlace = (data) => {
    setBetData(data);
  };

  const onCashout = (data) => {
    setCashoutData(data);
    console.log("onCashOut", data);
  };

  const onSingleCashData = (data) => {
    setOneCashout(data);
    // console.log("onSingleCashOut",data)
  };

  const parsedBetData = planeData?.length > 0 ? planeData.split(":") : null;
  const planeStatus = parsedBetData?.length > 0 ? parsedBetData[2] : 0;
  // const planeMultiplier = parsedBetData?.length > 0 ? parsedBetData[1] : 0;
  const endDelay = parsedBetData?.length > 0 ? parsedBetData[1] : 0;

  useEffect(() => {
    if (endDelay >= 4) {
      setShowBetDataTab(true);
    }

    if (planeStatus == 2) {
      const timer = setTimeout(() => {
        setShowBetDataTab(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [endDelay]);


  return (
    <div>
     
      {!myBetSectionModel && (
        <div className="flex-container">
          <div>
            <NavBar
              info={info}
              maxOdds={maxOdds}
              myBetSectionModel={myBetSectionModel}
              setMyBetSectionModel={setMyBetSectionModel}
            />
          </div>
          <div className="game-section">
            <div className="game">
              <Unity
                unityProvider={unityProvider}
                className="canvas-game"
                tabIndex={-1}
                devicePixelRatio={devicePixelRatio}
              />

              <div className="game-Rule">
                <GameRule />
              </div>
            </div>

            <div className="deshboard-section">
              <div className="tab-container">
                <div
                  className={`tab ${activeTab === "dashboard" ? "active" : ""}`}
                  onClick={() => handleTabChange("dashboard")}
                >
                  <div className="tab-rocket">
                    <span>{image.rocket}</span>
                    <span>Dasboard</span>
                  </div>
                </div>
                <div
                  className={`tab ${
                    activeTab === "luckyPlayer" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("luckyPlayer")}
                >
                  <div className="lucky-group">
                    <div>{image.luckyPlayer}</div>
                    <div>Lucky Player</div>
                    {showBetDataTab ? (
                      <h2
                        className="lp_p"
                        style={{
                          color: "var(--tableText)",
                          fontWeight: "bold",
                        }}
                      >
                        {betData.length}
                      </h2>
                    ) : (
                      <h2
                        className="lp_p"
                        style={{
                          color: "var(--tableText)",
                          fontWeight: "bold",
                        }}
                      >
                        0
                      </h2>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`tab-content ${
                  activeTab === "dashboard" ? "active" : ""
                }`}
              >
                {/* <MainDesBoard
                info={info}
                planeData={planeData}
                queryParams={queryParams}
              ></MainDesBoard> */}

                {/* <Deshboard_1 /> */}
                {/* <MainDeshBoard></MainDeshBoard> */}
                <div className="M-full">
                  <div className="deshboard-upr">
                    <div className="deshboard-upr2">
                      <div className="deshboard-rocket">
                        <p>{image.rocket}</p>
                        {/* Assuming this renders the rocket image/icon */}
                        <p className="deshboard-p">Dashboard</p>
                      </div>
                    </div>
                  </div>
                  <span className="num">#45675672</span>

                  {/* <div className="w-full">
                    <div className="dash-section"> */}
                  <div className="w-full ">
                    {betButton.slice(0, 2).map((el, i) => (
                      <DasBoard
                        key={i}
                        info={info}
                        planeData={planeData}
                        queryParams={queryParams}
                        index={i}
                        betButton={betButton}
                        onBetPlace={onBetPlace}
                        onCashout={onCashout}
                        onSingleCashData={onSingleCashData}
                        toastMessage={toastMessage}
                        setToastMessage={setToastMessage}
                        toastColor={toastColor}
                        setToastColor={setToastColor}
                      />
                    ))}
                  </div>
                  {/* </div>
                  </div> */}
                </div>
              </div>
              <div
                className={`tab-content ${
                  activeTab === "luckyPlayer" ? "active" : ""
                }`}
              >
                {/* <LuckyPlayer /> */}
                <LuckyPlayers
                  betData={betData}
                  cashoutData={cashoutData}
                  oneCashout={oneCashout}
                  planeData={planeData}
                ></LuckyPlayers>
              </div>
            </div>
          </div>
          {toastMessage && (
            <Toast message={toastMessage} color={toastColor}></Toast>
          )}
        </div>
      )}
      {myBetSectionModel && (
        <MyBetSection
          info={info}
          myBetSectionModel={myBetSectionModel}
          setMyBetSectionModel={setMyBetSectionModel}
          oneCashout={oneCashout}
        ></MyBetSection>
      )}
    </div>
  );
}

export default Home;
