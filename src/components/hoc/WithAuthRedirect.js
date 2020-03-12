import React, { Component } from "react";
import { connect } from "react-redux";
import * as authSelectors from "../../redux/auth/authSelectors";

const WithAuthRedirect = BaseComponent => {
  class WithAuthRedirect extends Component {
    componentDidMount() {
      const { location, history, authenticated } = this.props;

      location && location.pathname === "/login" && authenticated && history.replace("/diary");
      location && location.pathname === "/signup" && authenticated && history.replace("/diary");

      location && location.pathname === "/diary" && !authenticated && history.replace("/login");
      location && location.pathname === "/calculator" && !authenticated && history.replace("/login");
      location && location.pathname === "/achievements" && !authenticated && history.replace("/login");
    }

    componentDidUpdate(prevProps) {

      if(prevProps.authenticated !== this.props.authenticated) {

        const { location, history, authenticated } = this.props;

        location && location.pathname === "/login" && authenticated && history.replace("/diary");
        location && location.pathname === "/signup" && authenticated && history.replace("/diary");

        location && location.pathname === "/diary" && !authenticated && history.replace("/login");
        location && location.pathname === "/calculator" && !authenticated && history.replace("/login");
        location && location.pathname === "/achievements" && !authenticated && history.replace("/login");

      };

    };

    render() {
      return <BaseComponent {...this.props} />;
    }
  };

  const mapStateToProps = state => ({
    authenticated: authSelectors.getIsAuthenticated(state)
  });

  return connect(mapStateToProps)(WithAuthRedirect);
};

export default WithAuthRedirect;
