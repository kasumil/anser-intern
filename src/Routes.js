import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./Pages/Main/Main";
import SignIn from "./Pages/SignIn/SignIn";
import Signup from "./Pages/SignUp/Signup";
import AccountInfo from "./Pages/UserInfo/AccountInfo";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/accountinfo" component={AccountInfo} />
      </Switch>
    </Router>
  );
}

export default Routes;
