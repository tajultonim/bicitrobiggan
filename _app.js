import "../styles/fonts.css";
import theme from "../theme";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "../comps/Header";
import Footer from "../comps/Footer";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  );
}

export default MyApp;
