import DisplayListings from "../components/DisplayListings";
import { Text } from "../components/GlobalStyles/StyleText";
import {
  HomeContainer,
  HomeWelcome,
  HomeLogin,
  HomeWrapper,
} from "../components/GlobalStyles/StyleHome";
import LoginForm from "../components/LoginForm";

export default function HomePage() {
  return (
    <HomeContainer>
      <HomeWrapper>
        <HomeWelcome>
          <Text>
            <h2>Welcome to Fox Body Swap Meet</h2>
            <p>
              We are a community of automotive enthusiasts, passionate about
              '79-'93 Ford Mustangs and the 5.0L legacy. Fox Body Swap Meet is the online destination for buying and selling new and used parts for Fox Body Mustangs.  Get started today and start looking for what you need for your project!
            </p>
            <ul>
              <h3>New here? Visit our...</h3>
              <li>
                <a href="./aboutus">About Us</a> page for more on who we are
              </li>
              <li>
                <a href="./howitworks">How It Works</a> page for more on how it
                works at Fox Body Swap Meet
              </li>
            </ul>
          </Text>
        </HomeWelcome>
        <HomeLogin>
          <LoginForm />
        </HomeLogin>
      </HomeWrapper>
      <DisplayListings />
    </HomeContainer>
  );
}
