import { useContext } from "react";
import Layout from "../src/components/Layout";
import "../styles/globals.css";
import "../styles/fonts.css";
import "../styles/landing.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { store, persistor } from "../src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import DarkModeProvider from "../src/components/common/darkmodeContext/DarkModeContext";

import NextNProgress from "nextjs-progressbar";

store.subscribe(() => console.log(/* store.getState() */));

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <DarkModeProvider>
        <NextNProgress color="#f9913a" height={2} showOnShallow={true} />
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </DarkModeProvider>
    </Provider>
  );
}

export default MyApp;
