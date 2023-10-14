import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
//   baseURL: "https://nile-booking.onrender.com/api"
});