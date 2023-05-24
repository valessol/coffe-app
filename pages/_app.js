import { CoffeeProvider } from "../context/CoffeeContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <CoffeeProvider>
      <Component {...pageProps} />
    </CoffeeProvider>
  );
}

export default MyApp;
