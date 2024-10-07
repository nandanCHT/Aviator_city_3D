import React, { useEffect } from "react";
import "../provably/provably.css";
import "../MyBetSection/MyBetSection.css";
import { image } from "../../assets/image";
import { BiPointer } from "react-icons/bi";

const ProvablyFair = () => {
  useEffect(() => {
    const lines = document.querySelectorAll(".line");
    lines.forEach((line) => {
      line.classList.add("animate-dotted-line");
    });
  }, []);

  return (
    <div className="flowchart-main">
      <div className="flowChat">
        <svg width="900" height="800" viewBox="0 0 800 600">
          {/* Boxes for Flowchart Elements */}

          <rect x="10" y="10" width="120" height="40" className="box" />
          <text x="45" y="35" className="label">
            RoundId
          </text>

          <rect x="10" y="162" width="120" height="40" className="box" />
          <text x="30" y="188" className="label">
            Server Seed
          </text>

          <rect x="315" y="10" width="250" height="40" className="box" />
          <text x="440" y="35" className="label" text-anchor="middle">
            Array of bets with timestamps
          </text>

          <rect x="170" y="162" width="120" height="40" className="box" />
          <text x="185" y="188" className="label">
            Player1 Seed
          </text>

          <rect x="360" y="162" width="120" height="40" className="box" />
          <text x="380" y="188" className="label">
            Player2 Seed
          </text>

          <rect x="550" y="162" width="120" height="40" className="box" />
          <text x="570" y="188" className="label">
            Player3 Seed
          </text>

          <rect x="350" y="290" width="160" height="40" className="box" />
          <text x="430" y="315" className="label" textAnchor="middle">
            Combined Seed
          </text>

          <rect x="320" y="390" width="225" height="40" className="box" />
          <text x="435" y="415" className="label" textAnchor="middle">
            HMAC_SHA256 (hexadecimal)
          </text>

          <rect x="320" y="490" width="225" height="40" className="box" />
          <text x="430" y="515" className="label" textAnchor="middle">
            Hexadecimal to decimal (dec)
          </text>

          <rect x="195" y="600" width="460" height="40" className="box" />
          <text x="425" y="625" className="label" textAnchor="middle">
            (2^32 / (Dec + 1)) * HouseEdge % Max Multiplier = Final Multiplier
          </text>

          {/* Dotted Lines Connecting Elements */}
          <line x1="65" y1="51" x2="65" y2="163" className="line" />

          <line
            x1="65"
            y1="260"
            x2="420"
            y2="260"
            className="line"
            stroke-width="2"
          />
          {/* <line
          x1="227"
          y1="260"
          x2="420"
          y2="260"
          className="line"
          stroke-width="2"
        /> */}
          <line
            x1="605"
            y1="260"
            x2="420"
            y2="260"
            className="lineRiverse"
            stroke-width="2"
          />

          {/*  */}
          <svg width="800" height="300" xmlns="http://www.w3.org/2000/svg">
            {/* <!-- First animated dashed curve, shifted 6 points downward --> */}
            <path
              d="M 425 52 C 400 86, 200 112, 225 162"
              stroke="white"
              stroke-width="2"
              fill="transparent"
              stroke-dasharray="5,5"
              stroke-dashoffset="100"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="100"
                to="0"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>

            {/* <!-- Second animated dashed curve, shifted 6 points downward --> */}
            <path
              d="M 425 52 C 500 102, 600 112, 600 162"
              stroke="white"
              stroke-width="2"
              fill="transparent"
              stroke-dasharray="5,5"
              stroke-dashoffset="100"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="100"
                to="0"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>
          </svg>

          {/*  */}

          <line x1="228" y1="203" x2="228" y2="260" className="line" />
          <line x1="425" y1="54" x2="425" y2="160" className="line" />

          <line x1="604" y1="203" x2="604" y2="260" className="line" />
          <line x1="426" y1="203" x2="426" y2="260" className="line" />

          <line x1="420" y1="260" x2="420" y2="290" className="line" />

          <line x1="420" y1="330" x2="420" y2="390" className="line" />

          <line x1="65" y1="205" x2="65" y2="260" className="line" />
          <line x1="420" y1="430" x2="420" y2="490" className="line" />
          <line x1="420" y1="530" x2="420" y2="600" className="line" />
        </svg>
      </div>
    </div>
  );
};

export default ProvablyFair;
