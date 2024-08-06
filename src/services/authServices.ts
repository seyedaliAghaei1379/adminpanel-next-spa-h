"use client";
import api, {BASE_URL} from "@/services/api";
import axios from "axios";


interface UserCredentials {
    email: string;
    password: string;
}


export const login = async (credentials: UserCredentials) => {
    // const response = await api.post('/login-user', credentials);
    const response = await axios.post(`${BASE_URL}/login-user`, credentials);
    return response.data;
};

export const  logout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('permissions')
    window.location.reload();
}