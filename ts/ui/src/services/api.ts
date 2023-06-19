import axios from "axios";
import {
  retrieveAccessToken,
  retrieveRefreshToken,
  storeAccessToken,
} from "utils/storage.util";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_SERVICE || "http://localhost:8080/api/v1",
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer " + retrieveAccessToken(),
  },
});

const refreshToken = async () => {
  try {
    const refresh = retrieveRefreshToken();
    const resp = await instance.post("/auth/refresh", { refresh });
    return resp;
  } catch (e) {
    console.log("Error", e);
  }
};

instance.interceptors.request.use(
  async (config) => {
    const token = retrieveAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response?.status === 401 && originalRequest._retry) {
      originalRequest._retry = true;

      const resp = await refreshToken();

      const accessToken = resp?.data.accessToken;

      storeAccessToken(accessToken);
      instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default instance;
