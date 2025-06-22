// src/api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://8344-58-237-125-70.ngrok-free.app', // 실제 서버 주소
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
