import axios from "axios"

export const addCustomerInUser = async (useId: any, customersList: any) => {
    try {
        let response = await axios.put(`/users/${useId}/customers`, customersList);
        // if(respose.status == 200) {
        //     return respose.data;
        // }
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getAllUser = async () => {
    try {
        let response = await axios.get(`/users`);
        // if(respose.status == 200) {
        //     return respose.data;
        // }
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getUserById = async (userId: any) => {
    try {
        const respnose = await axios.get(`/users/${userId}`);
        return respnose.data;
    } catch (error: any) {
        if(error.response) {
            throw error.response.data;
        }
    }
}

export const patchUserById = async (userId: number, user: any) => {
    try {
        const respnose = await axios.put(`/users/${userId}`, user);
        return respnose.data;
    } catch (error: any) {
        if(error.response) {
            throw error.response.data;
        }
    }
}


export const deleteUserById = async (userId: number) => {
    try {
        const respnose = await axios.delete(`/users/${userId}`);
        return respnose.data;
    } catch (error: any) {
        if(error.response) {
            throw error.response.data;
        }
    }
}

export const searchUser = async (search: any) => {
    try {
        // const respnose = await axios.get(`/users/search/filters`, { params: search });
        const respnose = await axios.get(`/users/filter${search}`);
        return respnose.data;
    } catch (error: any) {
        if(error.response) {
            throw error.response.data;
        }
    }
}
