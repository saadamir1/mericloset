import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "30560d91abe14549b4cdbc4cb3cd1225",
  },
});
