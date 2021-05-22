// Reducer for search history list
const savedSearchesList = (state = [], action) => {
  switch (action.type) {
    case "Add Search Item to History":
      return [action.payload, ...state];
    case "Delete Search History":
      return [];
    default:
      return state;
  }
};

// Reducer for search list
const searchResultsList = (state = [], action) => {
  switch (action.type) {
    case "Save Search Results":
      return action.payload;
    default:
      return state;
  }
};

export { searchResultsList, savedSearchesList };
