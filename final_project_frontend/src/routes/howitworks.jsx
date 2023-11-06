import { Text } from "../components/StyleText";

export default function HowItWorks() {
  return (
    <Text>
      <h3>How It Works Section</h3>
      <ul>
        <li>
          Create an account or login <a href="./register">here</a>
        </li>
        <li>
          Once you've registered as a user, you can{" "}
          <a href="./createlisting">create a listing</a> and list your item for
          sale
        </li>
        <li>
          Search listings here and see what's for sale out there. Pick something
          up today and get your Mustang right!
        </li>
        <li>Sign up at www.stripe.com so you can get your payout!</li>
      </ul>
    </Text>
  );
}
