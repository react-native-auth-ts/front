import axios from "axios";
import * as SecureStore from "expo-secure-store";

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    withCredentials: true,
});

apiClient.interceptors.request.use(
    async config => {
        const token = SecureStore.getItemAsync("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export default apiClient;
