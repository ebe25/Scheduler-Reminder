import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {Auth0Provider} from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-8173o1npth7z5r6w.us.auth0.com"
      clientId="M6A0WcbTMMQCZveM3KlwvqugOzNq6YLn"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://dev-8173o1npth7z5r6w.us.auth0.com/api/v2/",
        scope:
          "read:current_user update:current_user_metadata response_mode=web_message offline_access openid profile email ",
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}>
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
