import axios from "axios";

export const getImage = async (url: any) => {
    try {
        let response = await axios.get(url, {responseType: 'blob'});
        if(response.status == 200 || response.status == 200) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}