// action for save history item
const addHistoryItem = (item) => {
  return {
    type: "Add Search Item to History",
    payload: item,
  };
};

// action for reset search history list
const deleteSearchHistory = () => {
  return {
    type: "Delete Search History",
  };
};

// action for save search results
const saveSearchResults = (item) => {
  return {
    type: "Save Search Results",
    payload: item,
  };
};

export { addHistoryItem, saveSearchResults, deleteSearchHistory };
