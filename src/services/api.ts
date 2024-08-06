import axios from "axios";



const api = axios.create({
    baseURL: process.env.BASE_API , // آدرس API لاراول
});

export default api