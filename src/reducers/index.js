import { combineReducers } from "redux";

const placeholder = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  placeholder,
});

export default rootReducer;
