import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.REACT_APP_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
