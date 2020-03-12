import React, { lazy, Suspense, Component, createContext } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import NavPage from "../pages/navPage/NavPage";
import Header from "./header/Header";
import * as authOperations from "../redux/auth/authOperations";
import { Loader } from "./loader/Loader";

export const appContext = createContext();

// lazy import

const HomePage = lazy(() =>
  import("../pages/homePage/HomePage" /* webpackChunkName: "home-page" */)
);

const AuthPage = lazy(() =>
  import(
    "../pages/authorization/Authorization" /* webpackChunkName: "auth-page" */
  )
);

const Diary = lazy(() =>
  import("./diary-block/DiaryBlock" /* webpackChunkName: "diary-block" */)
);

const CalcForm = lazy(() =>
  import(
    "./calcForm/CalcFormContainer" /* webpackChunkName: "calcForm-block" */
  )
);

const Achievements = lazy(() =>
  import(
    "./achievements/Achievements" /* webpackChunkName: "achievements-block" */
  )
);

// component
class App extends Component {
  state = {
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    showExitModal: false
  };

  componentDidMount() {
    this.checkScreenWidth();
    this.props.refreshUser();
  }

  componentDidUpdate() {
    this.props.refreshUser();
  }

  checkScreenWidth = () => {
    if (window.innerWidth < 768) {
      this.setState({
        isMobile: true,
        isTablet: false,
        isDesktop: false
      });
    } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
      this.setState({
        isTablet: true,
        isMobile: false,
        isDesktop: false
      });
    } else {
      this.setState({
        isDesktop: true,
        isMobile: false,
        isTablet: false
      });
    }
  };

  openExitModal = () => {
    this.setState({ showExitModal: true });
  };

  closeModal = () => {
    this.setState({ showExitModal: false });
  };

  closeOnBackdrop = e => {
    e.target === e.currentTarget && this.setState({ showExitModal: false });
  }

  render() {
    const { isMobile, isTablet, isDesktop, showExitModal } = this.state;
    return (
      <appContext.Provider
        value={{
          isMobile,
          isTablet,
          isDesktop,
          showExitModal,
          openExitModal: this.openExitModal,
          closeModal: this.closeModal,
          closeOnBackdrop: this.closeOnBackdrop
        }}
      >
        <Header />
        <Suspense fallback={<Loader/>}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route
              path="/nav"
              render={props => (
                <NavPage {...props} isMobile={isMobile} isDesktop={isDesktop} />
              )}
            />
            <Route path="/login" component={AuthPage} />
            <Route path="/signup" component={AuthPage} />
           
            <Route path="/diary" component={Diary} />
            <Route path="/calculator" component={CalcForm} />
            <Route path="/achievements" component={Achievements} />
            
          </Switch>
        </Suspense>
      </appContext.Provider>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.session.authenticated
});

const mapDispatchToProps = {
  refreshUser: authOperations.refreshUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
