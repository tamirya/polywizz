import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  addHistoryItem,
  saveSearchResults,
} from "../store/actions/searchActions";
import SearchHistoryList from "./SearchHistoryList";
import Error from "./Error";
import getGithubData from "../services/Api";

const Search = () => {
  // state elements
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [queryForSearch, setQueryForSearch] = useState(null);

  // form state elements
  const [programingLanguages, setProgramingLanguages] = useState("php,ruby");
  const [maxStars, setMaxStars] = useState("10");
  const [minStars, setMinStars] = useState("1");
  const [lastUpdateRepository, setLastUpdateRepository] = useState("");

  //dispatch
  const dispatch = useDispatch();

  // fetchData Reference
  const fetchDataRef = useRef();

  fetchDataRef.current = async () => {
    let success = false;
    try {
      // fetch data
      const results = await getGithubData(queryForSearch);
      dispatch(saveSearchResults(results));
      success = true;
    } catch (error) {
      // on error handle
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setQueryForSearch(null);
      setLoading(false);
      // save search item
      const savedHistoryItem = {
        minStars,
        maxStars,
        programingLanguages,
        success,
      };
      dispatch(addHistoryItem(savedHistoryItem));
    }
  };

  // useEffect for queryForSearch
  useEffect(() => {
    if (!queryForSearch) {
      return;
    }
    fetchDataRef.current();
  }, [queryForSearch]);

  // submit Form Handler
  const submitFormHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    // reset search results
    dispatch(saveSearchResults([]));
    // build the query
    let query = "";
    if (minStars.length > 0) {
      query += `min_stars=${minStars}`;
    }

    if (maxStars.length > 0) {
      if (+minStars > +maxStars || +minStars === +maxStars || minStars === "") {
        setError(
          "Min Number Can't Be Bigger Or Equal Then Max Number Or Min Number Must Be Entered"
        );
        setTimeout(() => {
          setError(null);
        }, 5000);
        setMinStars(1);
        setLoading(false);
        return;
      }
      query += `&max_stars=${maxStars}`;
    }

    if (programingLanguages.length > 0) {
      query += `&programing_languages=${programingLanguages}`;
    }

    if (lastUpdateRepository.length > 0) {
      query += `&lastUpdateRepository=${lastUpdateRepository}`;
    }

    // set the query
    setQueryForSearch(query);
  };

  return (
    <div className="container mt-4">
      {error && <Error msg={error} />}
      <div className="row">
        <div className="col-6">
          <form className="form-github-search" onSubmit={submitFormHandler}>
            <h3>GitHub Search</h3>

            <div className="form-group">
              <label>Min Stars</label>
              <input
                name="min_stars"
                value={minStars}
                onChange={(e) => setMinStars(e.target.value)}
                type="number"
                className="form-control"
                placeholder="Min Stars"
              />
            </div>

            <div className="form-group">
              <label>Max Stars</label>
              <input
                name="max_stars"
                value={maxStars}
                onChange={(e) => setMaxStars(e.target.value)}
                type="number"
                className="form-control"
                placeholder="Max Stars"
              />
            </div>

            <div className="form-group">
              <label>Last update repository</label>
              <input
                name="lastUpdateRepository"
                value={lastUpdateRepository}
                onChange={(e) => setLastUpdateRepository(e.target.value)}
                type="date"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Programing language/s</label>
              <input
                name="programing_languages"
                type="text"
                value={programingLanguages}
                onChange={(e) => setProgramingLanguages(e.target.value)}
                className="form-control"
                placeholder="Programing language/s separate by comma"
              />
            </div>
            {!loading ? (
              <button type="submit" className="btn btn-primary btn-block">
                Search
              </button>
            ) : (
              <button type="button" className="btn btn-primary btn-block">
                <i className="fas fa-spinner fa-spin"></i>
                {" Loading..."}
              </button>
            )}
          </form>
        </div>
        <div className="col-6">
          <SearchHistoryList />
        </div>
      </div>
    </div>
  );
};

export default Search;
