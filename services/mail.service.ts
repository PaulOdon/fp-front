import axios from "axios"

export const postMail = async (mail: any) => {
    try {
        let respose = await axios.post("/mail", mail);
        if(respose.status == 200 || respose.status == 201) {
            return respose.data;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}

export const putMail = async (id: any, mail: any) => {
    try {
        let respose = await axios.put(`/mail/${id}`, mail);
        if(respose.status == 200 || respose.status == 201) {
            return respose.data;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}

export const getMailByCourseId = async (id: number) => {
    try {
        let respose = await axios.get(`/mail/course/${id}`,);
        if(respose.status == 200 || respose.status == 201) {
            return respose.data;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}