import axios from "axios"

export const login = async (data: {email: string, password: string}) => {
    try {
        let response = await axios.post("/auth/login", data);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
}

export const resetPassword = async (data: {email: string}) => {
    try {
        let response = await axios.post("/auth/reset-password", data);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
}

export const getLogedUser = async () => {
    try {
        const respose = await axios.get("auth/get-user");
        return respose.data;
    } catch (error: any) {
        if(error.response) {
            throw error.response.data;
        }
    }
}

export const register = async (user: any) => {
   return  await axios.post("/auth/register", user);
    // try {
    //     let response = await axios.post("/auth/register", user);
    //     if(response.status == 200) {
    //         return response.data;
    //     }
    //     return response;
    // } catch (error) {
    //     console.log(error);
    // }
}

export const updatePasswordUser = async (userId: string, user: any) => {
    return  await axios.put(`/auth/update-password/${userId}`, user);
}

