import React from "react";
import { Link } from "react-router-dom";
import { Text } from "../components/GlobalStyles/StyleText";

export default function HowItWorksCopy() {
  return (
    <Text>
      <h2>How It Works</h2>
      <ul>
        <li>
          Create an account or login <Link to="/register">here</Link>
        </li>
        <li>
          Once you've registered as a user, you can{" "}
          <Link to="/createlisting">create a listing</Link> and list your item for
          sale
        </li>
        <li>
          Search listings here and see what's for sale out there. Pick something
          up today and get your Mustang right!
        </li>
        <li>
          Our fee is 6% of the transaction price (paid by the seller).  What you get in return is
          <ul>
            <li>
              Conflict resolution on registered disputes
            </li>
            <li>
              A community of enthusiasts who understand these cars, their values, and their related parts
            </li>
          </ul>
        </li>
        <li>
          Sign up at{" "}
          <a href="https://stripe.com/" target="_blank">
            www.stripe.com
          </a>{" "}
          so you can get your payout!
        </li>
      </ul>
    </Text>
  );
}
