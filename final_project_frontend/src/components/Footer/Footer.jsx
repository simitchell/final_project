import React from "react";
import { StyleFooter } from "./StyleFooter";

export default function Footer() {
  return (
    <StyleFooter>
      <div className="main-footer">
        <div className="container">
          <div className="row">
            {/* Column 1 */}
            <div className="col">
              <h4>FOX BODY SWAP MEET</h4>
              <ul className="list-unstyled">
                <li>(555)-555-5555</li>
                <li>Greenville, SC</li>
                <li>411 University Ridge</li>
              </ul>
            </div>
            {/* Column 2 */}
            <div className="col">
              <h4>5.0L</h4>
              <ul className="list-unstyled">
                <li>Windsor</li>
                <li>T-5 Transmissions</li>
                <li>A9L Engine Management</li>
              </ul>
            </div>
            {/* Column 3 */}
            <div className="col">
              <h4>THiNgS</h4>
              <ul className="list-unstyled">
                <li>All</li>
                <li>the</li>
                <li>things</li>
              </ul>
            </div>
          </div>
          <div className="row2">
            <p>Contact us at: foxbodyswapmeet@gmail.com</p>
            <p className="col-sm">
              &copy;{new Date().getFullYear()} FOX BODY SWAP MEET INC | ALL
              RIGHTS RESERVED | LLC
            </p>
          </div>
        </div>
      </div>
    </StyleFooter>
  );
}