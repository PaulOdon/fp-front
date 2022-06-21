import axios from "axios"

export const getAllStatus = async () => {
    try {
        let respose = await axios.get("/status");
        if(respose.status == 200 || respose.status == 201) {
            return respose.data;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}