// src/utils/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // Указываем базовый URL для всех запросов
  timeout: 5000, // Таймаут для запросов
});

// Добавим обработчик ошибок и другие настройки, если нужно
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Например, глобальная обработка ошибок
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
