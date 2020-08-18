import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Components/Nav/Nav";
import AccountInfo from "./Pages/AccountInfo";
import SignIn from "./Pages/SignIn";
import Footer from "./Components/Footer";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route />
      </Switch>
      <Footer />
    </Router>
  );
}

export default Routes;
