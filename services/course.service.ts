import axios from "axios"

export const getAllCourse = async () => {
    try {
        let respose = await axios.get("/course");
        if(respose.status == 200 || respose.status == 201) {
            return respose.data;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}

export const postCourse = async (course: any) => {
    try {
        let respose = await axios.post("/course", course);
        if(respose.status == 200 || respose.status == 201) {
            return respose.data;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}

export const putCourse = async (id: string, course: any) => {
    try {
        let respose = await axios.put(`/course/${id}`, course);
        if(respose.status == 200 || respose.status == 201) {
            return respose.data;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}

export const getCourseById = async (id: number) => {
    try {
        let respose = await axios.get(`/course/${id}`,);
        if(respose.status == 200 || respose.status == 201) {
            return respose.data;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}

export const getCourseByNumero = async (numero: string) => {
    try {
        let respose = await axios.get(`/course/numero/${numero}`,);
        if(respose.status == 200 || respose.status == 201) {
            return respose.data;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}

export const deletCourse = async (id: number) => {
    try {
        let respose = await axios.delete(`/course/${id}`,);
        if(respose.status == 200 || respose.status == 201) {
            return respose.data;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}

export const getAllCourseByCustomerId = async (id: number) => {
    try {
        let respose = await axios.get(`/course/customer/${id}`,);
        if(respose.status == 200 || respose.status == 201) {
            return respose.data;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}