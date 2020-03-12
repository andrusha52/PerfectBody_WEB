export const getState = state => state;
export const getUser = state => state.session.user;
export const getIsAuthenticated = state => state.session.authenticated;
export const getToken = state => state.session.token;
export const getIsLoading = state => state.session.loading;
export const getError = state => state.session.error;