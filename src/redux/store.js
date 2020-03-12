import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { calcFormReducer } from "./calcForm/calcFormReducer";
import authReducer from "./auth/authReducer";

const sessionPersistConfig = {
  key: "session",
  storage,
  whitelist: ["token"]
};

const calcFormPersistConfig = {
  key: "calcForm",
  storage
};

const middleWares = [thunk];

const rootReducer = combineReducers({
  calcForm: persistReducer(calcFormPersistConfig, calcFormReducer),
  session: persistReducer(sessionPersistConfig, authReducer)
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleWares))
);

export const persistor = persistStore(store);
