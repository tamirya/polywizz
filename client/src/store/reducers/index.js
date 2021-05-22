import { searchResultsList, savedSearchesList } from "./searchReducers";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  savedSearchesList,
  searchResultsList,
});

export default allReducers;
