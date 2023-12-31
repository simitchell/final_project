import React from "react";
import { BottomRow, StyleFooter, TopRow } from "./Styles.Footer";

export default function Footer() {
  return (
    <StyleFooter>
      <h4>FOX BODY SWAP MEET</h4>
      <TopRow>
        {/* Column 1 */}
        <div className="col">
          <ul className="list-unstyled">
            <li>Greenville, SC</li>
            <li>(555)-555-5555</li>
          </ul>
        </div>
        {/* Column 2 */}
        <div className="col">
          {/* <h4>5.0L</h4> */}
          <ul className="list-unstyled">
            <li>Windsor Engines</li>
            <li>T-5 Transmissions</li>
          </ul>
        </div>
      </TopRow>
      <BottomRow>
        <p>Contact us at: foxbodyswapmeet@gmail.com</p>
        <p className="col-sm">
          &copy;{new Date().getFullYear()} FOX BODY SWAP MEET INC | ALL RIGHTS
          RESERVED | LLC
        </p>
      </BottomRow>
    </StyleFooter>
  );
}
