import axios from "axios"

export const getHistoryByCourseId = async (id: number) => {
    try {
        let respose = await axios.get(`/history/course/${id}`,);
        if(respose.status == 200 || respose.status == 201) {
            return respose.data;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}