import Router from "./router";
import { store } from "./store";
import { Provider } from "react-redux";
import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  const configGoogle: string = process.env.REACT_APP_CLIENT_GOOGLE_API_KEY as string;

  return (
    <GoogleOAuthProvider clientId={configGoogle}>
      <Provider store={store}>
        <Router />
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default App;
