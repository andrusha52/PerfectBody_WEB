import React, { Component } from "react";
import { connect } from "react-redux";
// import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { Loader } from "../loader/Loader";
import {
  getLoginError,
  getPasswordError,
  getRequestError
} from "../../verification/authVerification";
import * as authOperations from "../../redux/auth/authOperations";
import * as authSelectors from "../../redux/auth/authSelectors";
import * as opacityWithShakeTransition from "../../transitions/opacityWithShakeTransition.module.css";
import css from "./AuthForm.module.css";

// default authorization action

const actions = {
  login: "Вход",
  signup: "Регистрация"
};

// active enter-button styles

const activeActionLogin = activeAction => {
  if (activeAction === actions.login)
    return {
      color: "#fc842c",
      borderColor: "#fc842c"
    };
};

const activeActionSignup = activeAction => {
  if (activeAction === actions.signup)
    return {
      color: "#fc842c",
      borderColor: "#fc842c"
    };
};

// default state

const INITIAL_STATE = {
  action: actions.login,
  login: "",
  password: "",
  isErrorVisible: false,
  errorMsg: null
};

// component
class AuthForm extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    const { location } = this.props;
    location && location.pathname && location.pathname === "/login" && this.setState({action: actions.login});
    location && location.pathname && location.pathname === "/signup" && this.setState({action: actions.signup});
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    e.target.value !== "" && this.setState({ isErrorVisible: false });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { onLogin, onSignup, error } = this.props;
    const { login, password, action } = this.state;

    const loginInput = e.target.elements[2];
    const passwordInput = e.target.elements[3];

    const loginError = getLoginError(login);
    const passwordError = getPasswordError(password);
    const errorRequest = getRequestError(action, error, actions);

    if (loginError)
      this.setState({
        isErrorVisible: true,
        errorMsg: loginError
      });
    else if (passwordError)
      this.setState({
        isErrorVisible: true,
        errorMsg: passwordError
      });
    else this.setState({ isErrorVisible: false, errorMsg: null });

    if (!loginError && !passwordError) {
      action === actions.login && onLogin({ nickname: login, password });
      action === actions.signup && onSignup({ nickname: login, password });

      this.setState({
        isErrorVisible: true,
        errorMsg: errorRequest
      });

      loginInput.value = "";
      passwordInput.value = "";
    }
  };

  handleClick = e => {
    this.setState({ action: e.target.name });
  };

  render() {
    const { action, isErrorVisible, errorMsg } = this.state;
    const { loading } = this.props;

    const changeLogin = activeActionLogin(action);
    const changeSignup = activeActionSignup(action);

    return (
      <>
        <form
          className={css.form}
          onSubmit={this.handleSubmit}
          autoComplete="off"
        >
          <div className={css.navWrapper}>
            <NavLink to="/login" className={css.entryBtn}>
              <button
                style={changeLogin}
                className={css.entryBtn}
                type="button"
                name={actions.login}
                onClick={this.handleClick}
              >
                {actions.login}
              </button>
            </NavLink>
            <span className={css.entrySpan}> / </span>
            <NavLink to="/signup" className={css.entryBtn}>
              <button
                style={changeSignup}
                className={css.entryBtn}
                type="button"
                name={actions.signup}
                onClick={this.handleClick}
              >
                {actions.signup}
              </button>
            </NavLink>
          </div>
          <input
            type="text"
            name="login"
            onChange={this.handleChange}
            placeholder="Логин *"
          />
          <input
            type="password"
            name="password"
            onChange={this.handleChange}
            placeholder="Пароль *"
          />
          <CSSTransition
            in={isErrorVisible}
            timeout={700}
            classNames={opacityWithShakeTransition}
            unmountOnExit
          >
            <p className={css.errorNotification}>{errorMsg}</p>
          </CSSTransition>

          <button type="submit" name={action} className={css.submitBtn}>
            {action}
          </button>
        </form>
        {loading && <Loader />}
      </>
    );
  }
}

// AuthForm.propTypes = {
//   history: PropTypes.string.isRequired,
//   loginUser: PropTypes.func.isRequired,
//   userData: PropTypes.shape({}).isRequired,
//   registerUser: PropTypes.func.isRequired
// };

const mapStateToProps = state => ({
  error: authSelectors.getError(state),
  authenticated: authSelectors.getIsAuthenticated(state),
  loading: authSelectors.getIsLoading(state)
});

const mapDispatchToProps = {
  onLogin: authOperations.login,
  onSignup: authOperations.signup,
  onLogout: authOperations.logout
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
