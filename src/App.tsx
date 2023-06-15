import React from "react";
import Router from "./router";
import { store } from "./store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SnackbarProvider } from "notistack";
import { usePushNotifications } from "./hooks";

const App = () => {
  const configGoogle: string = process.env.REACT_APP_CLIENT_GOOGLE_API_KEY as string;
  const { token } = usePushNotifications();
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
