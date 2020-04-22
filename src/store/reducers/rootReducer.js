import authReducer from "./authReducer";
import linkReducer from "./linkReducer";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  auth: authReducer,
  link: linkReducer
});
export default rootReducer;
