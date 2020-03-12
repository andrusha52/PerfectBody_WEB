import { combineReducers } from "redux";
import authTypes from "./authTypes";

const user = (state = {}, { type, payload }) => {
  switch (type) {
    case authTypes.LOGIN_SUCCESS:
    case authTypes.SIGNUP_SUCCESS:
    case authTypes.REFRESH_SUCCESS:
      return payload.user.nickname;
    case authTypes.LOGOUT:
      return null;
    default:
      return state;
  }
};

const authenticated = (state = false, { type }) => {
  switch (type) {
    case authTypes.LOGIN_SUCCESS:
    case authTypes.SIGNUP_SUCCESS:
    case authTypes.REFRESH_SUCCESS:
      return true;
    case authTypes.LOGOUT:
      return false;
    default:
      return state;
  }
};

const loading = (state = false, { type }) => {
  switch (type) {
    case authTypes.LOGIN_REQUEST:
    case authTypes.SIGNUP_REQUEST:
    case authTypes.REFRESH_REQUEST:
      return !state;
    default:
      return state;
  }
};

const token = (state = null, { type, payload }) => {
  switch (type) {
    case authTypes.LOGIN_SUCCESS:
    case authTypes.SIGNUP_SUCCESS:
      return payload.user.token;
    case authTypes.LOGOUT:
      return null;
    default:
      return state;
  }
};

const error = (state = null, { type, payload }) => {
  switch (type) {
    case authTypes.LOGIN_SUCCESS:
    case authTypes.SIGNUP_SUCCESS:
    case authTypes.LOGOUT:
      return null;
    case authTypes.AUTH_ERROR:
      return payload;
    default:
      return state;
  }
};

export default combineReducers({
  user,
  authenticated,
  token,
  loading,
  error
});
