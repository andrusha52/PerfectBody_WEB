import authTypes from './authTypes';

export const loginRequest = () => ({
    type: authTypes.LOGIN_REQUEST
});

export const loginSuccess = ( request ) => ({
    type: authTypes.LOGIN_SUCCESS,
    payload: request 
});

export const signupRequest = () => ({
    type: authTypes.SIGNUP_REQUEST
});

export const signupSuccess = ( request ) => ({
    type: authTypes.SIGNUP_SUCCESS,
    payload: request 
});

export const refreshUserRequest = () => ({
    type: authTypes.REFRESH_REQUEST
});

export const refreshUserSuccess = ( request ) => ({
    type: authTypes.REFRESH_SUCCESS,
    payload: request 
});

export const authError = ( error ) => ({
    type: authTypes.AUTH_ERROR,
    payload: error 
});

export const logOut = () => ({
    type: authTypes.LOGOUT,
});