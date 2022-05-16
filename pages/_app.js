import React from "react";
import "../styles/globals.css";
import { NativeBaseProvider } from "native-base";
// Redux imports
import { Provider } from "react-redux";
import store, { persistor } from '../redux/store';
import { PersistGate } from "redux-persist/integration/react";
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <Navbar />
          <Component {...pageProps} />
        </NativeBaseProvider>{" "}
      </PersistGate>
    </Provider>

  );
}

export default MyApp;
