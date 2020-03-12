import React, { Component } from "react";
import AuthForm from "../../components/authForm/AuthForm";
import css from "./Authorization.module.css";
import WithAuthRedirect from "../../components/hoc/WithAuthRedirect";

class AuthPage extends Component {
  render() {
    return (
      <div className={css.pageWrapper}>
        <div className={css.pageContainer}>
          <AuthForm {...this.props} />
        </div>
      </div>
    );
  }
}

export default WithAuthRedirect(AuthPage);
