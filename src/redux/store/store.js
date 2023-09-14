import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"; //middleware que ayuda con la asincronía a redux
import rootReducer from "../reducer/reducer";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
