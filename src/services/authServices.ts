import api from "@/services/api";
import axios from "axios";

interface UserCredentials {
    email: string;
    password: string;
}


export const login = async (credentials: UserCredentials) => {
    // const response = await api.post('/login-user', credentials);
    const response = await axios.post('http://127.0.0.1:8000/login-user', credentials);
    return response.data;
};