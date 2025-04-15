import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import AppContainer from "./appcontainer.tsx";
// import config from 'config';

const AppRouter = (props) => {
  let name: string = "Satya";
  return (
    // <Router basename={`${config.publicPath}`}>
    <Router basename="/">
      <Route render={(props) => <AppContainer {...props} />} />
    </Router>
  );
};

export default AppRouter;
