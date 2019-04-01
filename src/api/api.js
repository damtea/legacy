import axios from "axios";
export default axios.create({
  baseURL: "http://192.168.1.39:8000/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*"
  }
});
