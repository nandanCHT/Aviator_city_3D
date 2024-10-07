import React, { useState } from "react";
import { image } from "../../assets/image";
import ProvablyFair from "../provably/ProvablyFair"; // Import the ProvablyFair component
import "../provably/provably.css";

const Simple = () => {
    const [active, setActive] = useState("Simple");
    const [isMuted, setIsMuted] = useState(false);

    const handleClick = (option) => {
        setActive(option);
    };

    const handleIconClick = () => {
        setIsMuted((prevState) => !prevState);
    };

    // Function to close Provably Fair section
    const handleClose = () => {
        setActive("Simple"); // Reset back to Simple or any other default state
    };

    return (
        <>
            <div className="simple-container">
                <div className="simple-cont">
                    <div className="simple-cont-section">
                        <div className="fair-section">
                            <div className="icon-image">
                                <p>{image.iconProvably}</p>
                            </div>
                            <p onClick={() => handleClick("Provably Fair")}>Provably Fair</p>{" "}
                        </div>
                    </div>

                    <div className="toggle-container">
                        <div className="toggle-buttons">
                            <button
                                className={active === "Simple" ? "active" : ""}
                                onClick={() => handleClick("Simple")}
                            >
                                Simple
                            </button>
                            <button
                                className={active === "Animated" ? "active" : ""}
                                onClick={() => handleClick("Animated")}
                            >
                                Animated
                            </button>
                        </div>

                        <div className="mute-icon" onClick={handleIconClick}>
                            {isMuted ? <p>{image.soundIcon}</p> : <p>{image.muteIcon}</p>}
                        </div>
                    </div>

                    {/* Conditionally render the ProvablyFair component with Close button */}
                    {active === "Provably Fair" && (
                        <div className="provably-fair-section">
                            <ProvablyFair />

                            <div className="close-button" onClick={handleClose}>
                                <span className="backbutton">{image.backButton}</span>
                                <span> Back</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Simple;
