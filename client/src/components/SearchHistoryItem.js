import React from "react";

// item history search result component
const SearchHistoryItem = (props) => {
  const item = props.item;

  return (
    <div className="card">
      <div className="card-body">
        <p className="card-text">Min Stars: {item.minStars}</p>
        <p className="card-text">Max Stars: {item.maxStars}</p>
        <p className="card-text">
          Programing Languages: {item.programingLanguages}
        </p>
        {item.success ? (
          <span className="badge badge-pill badge-success">Success</span>
        ) : (
          <span className="badge badge-pill badge-danger">Failed</span>
        )}
      </div>
    </div>
  );
};

export default SearchHistoryItem;
