import axios from "axios"

export const getCustomerByName = async (search: string) => {
    try {
        let respose = await axios.get(`/customer/search/${search}`);
        if(respose.status == 200) {
            return respose.data;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}

export const fetchCustomers = async () => {
  try {
    const res = await axios.get("/customer");
    if (res.status === 200) return res.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

export const createCustomer = async (data: any) => {
  try {
    const res = await axios.post("/customer", data);
    if (res.status === 201 || res.status === 200) return res;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

export const getOneCustomer = async (id: string) => {
  try {
    const res = await axios.get(`/customer/${id}`);
    if (res.status === 200) {
      return res.data;
    } else return false;
  } catch (error) {
    console.log(error);
  }
};

export const deteteOneCustomer = async (id: string) => {
  try {
    const res = await axios.delete(`/customer/${id}`);
    if (res.status === 200) {
      return res;
    } else return false;
  } catch (error) {
    console.log(error);
  }
};

export const updateCustomer = async (id: string, data: any) => {
  try {
    const res = await axios.put(`/customer/${id}`, data);
    if (res.status === 200) {
      return res;
    } else return false;
  } catch (error) {
    console.log(error);
  }
};

export const searchCustomer = async (search: any) => {
  try {
      const respnose = await axios.get(`/customer/filters${search}`);
      return respnose.data;
  } catch (error: any) {
      if(error.response) {
          throw error.response.data;
      }
  }
}
