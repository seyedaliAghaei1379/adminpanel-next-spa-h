import axios from "axios";
import {BASE_URL} from "@/services/api";


// interface userCategories {
//
//     "data": {
//         "name": string,
//         "updated_at": string,
//         "created_at": string,
//         "id": number,
//         "users": string[]
//     }
//
// }

// export const getUserCategories = async () : userCategories => {
//     // const response = await api.post('/login-user', credentials);
//     const response = await axios.post(`${BASE_URL}/login-user`);
//     return response.data;
// };


export const createUserCategories = async  (categoryName : {name : string}) => {
    const token = sessionStorage.getItem('token')

    const response = await axios.post(`${BASE_URL}/user_categories?include=users` , categoryName , {
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    })
    return response.data
}
export const getUserCategories = async  () => {
    const token = sessionStorage.getItem('token')

    const response = await axios.get(`${BASE_URL}/user_categories?include=users` ,   {
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    })
    return response.data
}
export const updateUserCategory = async  (id : number , name : {name : string} ) => {
    const token = sessionStorage.getItem('token')

    const response = await axios.put(`${BASE_URL}/user_categories/${id}?include=users` , name ,{
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    })
    return response.data
}
export const userCategory = async  (id : number) => {
    const token = sessionStorage.getItem('token')

    const response = await axios.get(`${BASE_URL}/user_categories/${id}?include=users` , {
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    })
    return response.data
}



