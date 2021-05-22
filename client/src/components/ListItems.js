import React from "react";
import Item from "./Item";
import { useSelector } from "react-redux";

// list search results component
const ListItems = () => {
  // get list items
  const list = useSelector((state) => state.searchResultsList);

  return (
    <div className="container search-results-list">
      {list.length === 0 && <h1>Search List Is Empty</h1>}
      {list.length > 0 && (
        <>
          <h3>Results:</h3>
          {list.map((row, i) => (
            <Item
              key={i}
              name={row.name}
              openIssues={row.open_issues}
              description={row.description}
              language={row.language}
              createdAt={row.created_at}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ListItems;
