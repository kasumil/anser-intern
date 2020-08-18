import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Components/Nav/Nav";
import AccountInfo from "./Pages/AccountInfo";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Nav} />
      </Switch>
    </Router>
  );
}

export default Routes;