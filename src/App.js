

import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import MyBetSection from "./components/MyBetSection/MyBetSection"; 
import MyBetSectionDetails from "./components/MyBetSectionDetails/MyBetSectionDetails";


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        {/* <Route path="/my-bets" element={<MyBetSection />} /> */}
        {/* <Route
          path="/mybet-details"
          element={<MyBetSectionDetails></MyBetSectionDetails>}
        ></Route> */}
      </Routes>
    </div>
  );
};

export default App;
