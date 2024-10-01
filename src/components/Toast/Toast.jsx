// import React from "react";
// import "./Toast.css";
// // import { toast } from "react-toastify";

// function Toast({ message, color }) {
//   return <div className="toast" style={{backgroundColor:`${color}`}}>{message}</div>;
// }


// export default Toast;


import React, { useEffect, useState } from "react";
import "./Toast.css";

function Toast({ message, color, duration = 3000 }) {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setShowToast(true); // Show the toast initially

    // Hide toast after the specified duration
    const timer = setTimeout(() => {
      setShowToast(false); // Start zoom-out animation
    }, duration);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [duration]);

  return (
    <div
      className={`toast ${showToast ? "show" : "hide"}`}
      style={{ backgroundColor: color }}
    >
      {message}
    </div>
  );
}

export default Toast;
