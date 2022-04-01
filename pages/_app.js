import Footer from "../components/Footer/Footer";
import { GlobalStyle } from "../components/GlobalStyle/GlobalStyle";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <GlobalStyle />
      <Component {...pageProps} />
      {session && <Footer />}
    </SessionProvider>
  );
}

export default MyApp;
