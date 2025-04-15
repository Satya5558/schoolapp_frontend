import React from "react";
import ReactDOM from "react-dom/client";
// import { App } from "./app";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/plugins/bootstrap/css/bootstrap.min.css";

//CSS & Bootstrap
import "./assets/css/style.css";

import "./assets/plugins/bootstrap/js/bootstrap.bundle.min.js";
import "./assets/plugins/select2/css/select2.min.css";

//Font Awesome
import "./assets/plugins/fontawesome/css/all.min.css";
import "./assets/plugins/fontawesome/css/fontawesome.min.css";

//alertify alerts
import "../node_modules/alertifyjs/build/css/alertify.css";
import "../node_modules/alertifyjs/build/css/themes/semantic.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import Approuter from "./approuter";
import { logout } from "./slices/userSlice";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient({
  defaultOptions: {
    onError: (error) => {
      if (error.response.status === 401) {
        store.dispatch(logout());
      }
    },
  },
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Approuter />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

// ReactDOM.render(
//   <Approuter/>,
// document.getElementById('root')
// );
