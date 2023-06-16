import React from "react";
import Router from "./router";
import { store } from "./store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SnackbarProvider } from "notistack";

const App = () => {
  const configGoogle: string = process.env.REACT_APP_CLIENT_GOOGLE_API_KEY as string;
  return (
    <GoogleOAuthProvider clientId={configGoogle}>
      <Provider store={store}>
        <SnackbarProvider maxSnack={8}>
          <Router />
        </SnackbarProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default App;
