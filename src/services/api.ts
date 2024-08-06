import axios from "axios";


export const BASE_URL = "http://127.0.0.1:8000/api/v1/app";

const api = axios.create({
    baseURL: process.env.BASE_API , // آدرس API لاراول
});

export default api