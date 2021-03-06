import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./Pages/Main/Main";
import SignIn from "./Pages/SignIn/SignIn";
import Signup from "./Pages/SignUp/Signup";
import AccountInfo from "./Pages/UserInfo/AccountInfo";
import CRSP from "./Pages/CRSP";
import SavedQueries from "./Pages/SavedQueries/SavedQueries";
import CardPage from "./Pages/CardPage/CardPageRoute";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/accountinfo" component={AccountInfo} />
        <Route exact path="/CRSP" component={CRSP} />
        <Route exact path="/savedqueries" component={SavedQueries} />
        <Route exact path="/cardpage" component={CardPage} />
      </Switch>
    </Router>
  );
}

export default Routes;
