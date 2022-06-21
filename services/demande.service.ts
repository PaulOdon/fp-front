import axios from "axios"

export const postDemande = async (course: any, mail: any) => {
    const data = {
        course: {},
        mail: {}
    }
    data.course = course
    data.mail = mail
    console.log(data)
    try {
        let response = await axios.post("/demande", data);
        if(response.status == 200 || response.status == 201) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}

export const searchDemande = async (search: any) => {
    try {
        const respnose = await axios.get(`/demande/filters${search}`);
        return respnose.data;
    } catch (error: any) {
        if(error.response) {
            throw error.response.data;
        }
    }
}

export const searchDemandeByCustomerId = async (search: any, id: any) => {
    try {
        const respnose = await axios.get(`/demande/filters/customer/${id}${search}`);
        return respnose.data;
    } catch (error: any) {
        if(error.response) {
            throw error.response.data;
        }
    }
}

