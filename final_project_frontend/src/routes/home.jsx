import DisplayListings from "../components/DisplayListings";
import { Text } from "../components/StyleText";

export default function HomePage() {
  return (
    <div>
      <Text>
        <h3>Welcome to Fox Body Swap Meet</h3>
        <p>
          We are a community of automotive enthusiasts, passionate about '79-'93
          Ford Mustangs and the 5.0L legacy. Fox Body Swap Meet is a curated
          buy/sell site for parts.
        </p>
        <p>
          Visit our <a href="./aboutus">About Us</a> page for more on who we are
          and our <a href="./howitworks">How It Works</a> page for more on how
          it works around here.
        </p>
      </Text>

      <DisplayListings />
    </div>
  );
}
