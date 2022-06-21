import axios from "axios"

export const getDashboard = async () => {
    try {
        let response = await axios.get("/dashboard");
        if(response.status == 200 || response.status == 201) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}

export const filterDashboard = async (query: any) => {
    try {
        let response = await axios.get(`/dashboard/${query}`);
        if(response.status == 200 || response.status == 201) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}

export const filterDashboardByCustomerId = async (query: any, id: any) => {
    try {
        let response = await axios.get(`/dashboard/customer/${id}/${query}`);
        if(response.status == 200 || response.status == 201) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}

export const getDashboardByCustomerId = async (customerId: any) => {
    try {
        let response = await axios.get(`/dashboard/customer/${customerId}`);
        if(response.status == 200 || response.status == 201) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}


export const getDashboardStatistique = async (startDate: any, endDate: any, dateRange: any, typeSelect: any) => {
    try {
        let response = await axios.get(`/dashboard/statistique`, {params:{startDate: startDate, endDate: endDate, dateRange: dateRange, typeSelect: typeSelect}});
        if(response.status == 200 || response.status == 201) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}

export const getDashboardStatistiqueByCustomerId = async (startDate: any, endDate: any, dateRange: any, typeSelect: any, customerId: any) => {
    try {
        let response = await axios.get(`/dashboard/customer/${customerId}/statistique`, {params:{startDate: startDate, endDate: endDate, dateRange: dateRange, typeSelect: typeSelect}});
        if(response.status == 200 || response.status == 201) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}

