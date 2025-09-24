import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

//Request interceptor -> attach access token
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access") || sessionStorage.getItem("access");
    if(accessToken){
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor -> handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry){
      originalRequest._retry = true;

      try{
        const refreshToken = localStorage.getItem("refresh") || sessionStorage.getItem("refresh");
        if(!refreshToken) throw new Error("No refresh token");

        const res = await axios.post("http://127.0.0.1:8000/api/auth/refresh/", {refresh: refreshToken});

        const newAccess = res.data.access;
        localStorage.setItem("access", newAccess);

        //Retry the failed request with new token
        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccess}`;
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return axiosInstance(originalRequest);
      }
      catch(err){
        console.error("Refresh token expired, please login again");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login"; //must re-login
      }
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;