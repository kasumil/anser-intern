import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AccountInfo from "./Pages/AccountInfo";
import SignIn from "./Pages/SignIn";
import Main from "./Pages/Main";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/accountinfo" component={AccountInfo} />
      </Switch>
    </Router>
  );
}

export default Routes;
