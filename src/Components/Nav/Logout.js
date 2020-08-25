import React from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loginActions } from "../../redux/actions/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const { setLogout } = loginActions;

const Logout = ({ setLogout }) => {
  const history = useHistory();

  const handleLogout = () => {
    setLogout(false);
    sessionStorage.removeItem("access_token");
    history.push("/");
  };

  return (
    <Link to="/" onClick={handleLogout}>
      logout <FontAwesomeIcon icon={faSignOutAlt} />
    </Link>
  );
};

export default connect(null, { setLogout })(Logout);
