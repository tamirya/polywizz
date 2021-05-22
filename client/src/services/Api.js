import axios from "axios";

/**
 * Service To Fetch Data
 */
const getGithubData = async (query) => {
  try {
    const url = "http://127.0.0.1:8000/githubApi?";
    const res = await axios.get(`${url}${query}&format=json`);
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getGithubData;
