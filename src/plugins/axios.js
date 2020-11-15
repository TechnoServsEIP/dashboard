import axios from "axios";
import store from "../store";

export default axios.create({
  baseURL:
    "https://x2021alsablue1371139462001.northeurope.cloudapp.azure.com:9096",
  headers: {
    Accept: "application/json"
  }
});
