import Footer from "../components/Footer/Footer";
import { GlobalStyle } from "../components/GlobalStyle/GlobalStyle"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
