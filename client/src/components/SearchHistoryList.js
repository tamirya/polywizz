import React from "react";
import SearchHistoryItem from "./SearchHistoryItem";
import { useSelector, useDispatch } from "react-redux";
import { deleteSearchHistory } from "../store/actions/searchActions";

// list history search results component
const SearchHistoryList = () => {
  // get list form store
  const list = useSelector((state) => state.savedSearchesList);
  const dispatch = useDispatch();

  // handle delete list
  const handleDeleteHistoryList = () => {
    dispatch(deleteSearchHistory());
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-9">
            <h3>Searches History:</h3>
          </div>
          <div className="col-3">
            <button
              type="button"
              className="btn btn-danger btn-block"
              onClick={handleDeleteHistoryList}
            >
              <i className="fa fa-trash" aria-hidden="true"></i>
              {" Clear"}
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col search-history-list">
            {list.map((item, i) => (
              <SearchHistoryItem key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchHistoryList;
