import React from "react";

// item search result component
const Item = (props) => {
  return (
    <div className="card search-results-item">
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">Description: {props.description}</p>
        <p className="card-text">Open Issues: {props.openIssues}</p>
        <p className="card-text">Language: {props.language}</p>
        <p className="card-text">
          Create At: {new Date(props.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Item;
