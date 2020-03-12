import axios from "axios";
import * as sessionSelectors from "./authSelectors";
import {
  loginRequest,
  loginSuccess,
  signupRequest,
  signupSuccess,
  refreshUserRequest,
  refreshUserSuccess,
  authError,
  logOut
} from "./authActions";

axios.defaults.baseURL = "https://slim-moms.goit.co.ua/api/v1";

const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const cleanAuthToken = () => {
  axios.defaults.headers.common['Authorization'] = null;
}

export const login = credential => dispatch => {
  dispatch(loginRequest());

  axios
    .post("/login", credential, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      setAuthToken(response.data.user.token);
      dispatch(loginSuccess(response.data));
    })
    .catch(error => dispatch(authError(error.response)))
    .finally(() => dispatch(loginRequest()));
};

export const signup = credential => dispatch => {
  dispatch(signupRequest());

  axios
    .post("/register", credential, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      setAuthToken(response.data.user.token);
      dispatch(signupSuccess(response.data));
    })
    .catch(error => dispatch(authError(error.response)))
    .finally(() => dispatch(loginRequest()));
};

export const refreshUser = () => (dispatch, getState) => {
  const token = sessionSelectors.getToken(getState());

  if (!token) return;

  setAuthToken(token);

  dispatch(refreshUserRequest());

  axios
    .get("/user")
    .then(response => dispatch(refreshUserSuccess(response.data)))
    .catch(error => dispatch(authError(error.response)))
    .finally(() => dispatch(refreshUserRequest()));
};

export const logout = () => dispatch => {
  cleanAuthToken();
  dispatch(logOut());
};
