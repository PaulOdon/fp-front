import axios from "axios"

export const getAllRoles = async () => {
    try {
        let respose = await axios.get("/role");
        if(respose.status == 200) {
            return respose.data;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}