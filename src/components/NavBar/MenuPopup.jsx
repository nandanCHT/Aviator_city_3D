// // MenuPopup.js
// import React from "react";
// import "./MenuPopup.css"; // Create a CSS file for styling
// import { useNavigate } from "react-router-dom";

// function MenuPopup({ isOpen, onClose }) {
//   if (!isOpen) return null;
//   const navigate = useNavigate();

//   return (
//     <div className="menu-popup-overlay" onClick={onClose}>
//       <div className="menu-popup" onClick={(e) => e.stopPropagation()}>
//         <ul>
//           <li onClick={() => alert('Provably Fair clicked')} style={{color:"white"}}>Provably Fair</li>
//           <li ><span><Link className='nev-bet' to='/mybets'></Link>My Bets</span></li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default MenuPopup;

import React from "react";
import { Link } from "react-router-dom";
import "./MenuPopup.css"; // Ensure this file contains the appropriate styles

function MenuPopup({
  isOpen,
  onClose,
  myBetSectionModel,
  setMyBetSectionModel,
}) {
  if (!isOpen) return null;

  const handleMyBets = () => {
    setMyBetSectionModel((prv) => !prv);
  };

  return (
    <div className="menu-popup-overlay" onClick={onClose}>
      <div className="menu-popup" onClick={(e) => e.stopPropagation()}>
        <ul>
          <li
            // onClick={() => alert("Provably Fair clicked")}
            style={{ color: "white" }}
          >
            Provably Fair
          </li>

          {/* <Link className="nev-bet" to="/my-bets">
            <li>My Bets</li>
          </Link> */}
          <li onClick={() => handleMyBets()}>My Bets</li>
        </ul>
      </div>
    </div>
  );
}

export default MenuPopup;
