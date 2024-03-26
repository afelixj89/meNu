// import axios from "axios";

// let apiUrl;

// const apiUrls = {
//   production: "placeholder",
//   development: "http://localhost:3001/",
// };

// if (window.location.hostname === "localhost") {
//   apiUrl = apiUrls.development;
// } else {
//   apiUrl = apiUrl.production;
// }

// const api = axios.create({
//   baseURL: apiUrl,
// });

// export default api;

import axios from "axios";

const getToken = () => {
  return new Promise((resolve) => {
    resolve(`Bearer ${localStorage.getItem("token") || null}`);
  });
};

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://menu-server-api-0cf67b94c3c8.herokuapp.com/"
      : "https://menu-server-api-0cf67b94c3c8.herokuapp.com/",
});

api.interceptors.request.use(
  async function (config) {
    config.headers["Authorization"] = await getToken();
    return config;
  },
  function (error) {
    console.log("Request error: ", error);
    return Promise.reject(error);
  }
);

export default api;
