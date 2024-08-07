import axios from "axios";
import api, {BASE_URL} from "@/services/api";
const token = sessionStorage.getItem('token')

interface userCategories {

    "data": {
        "name": string,
        "updated_at": string,
        "created_at": string,
        "id": number,
        "users": string[]
    }

}

// export const getUserCategories = async () : userCategories => {
//     // const response = await api.post('/login-user', credentials);
//     const response = await axios.post(`${BASE_URL}/login-user`);
//     return response.data;
// };


export const createUserCategories = async  (categoryName : {name : string}) => {
    const response = await axios.post(`${BASE_URL}/user_categories?include=users` , categoryName , {
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    })
    return response.data
}

