import axios from "axios";

export const getReceiverByName = async (search: string) => {
  try {
    let response = await axios.get(`/receiver/search/${search}`);
    if (response.status == 200) {
      return response.data;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};
export const postReceiver = async (data: any) => {
  try {
    const response = await axios.post("/receiver", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllReceivers = async () => {
  try {
    const res = await axios.get("/receiver");
    if (res.status === 200) return res.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

export const getOneReceiver = async (id: string) => {
  try {
    const response = await axios.get(`/receiver/${id}`);
    if (response.status === 200) return response.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

export const putReceiver = async (id: string, data: any) => {
  try {
    const response = await axios.put(`/receiver/${id}`, data);
    if (response.status === 200) return response;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

export const deleteOneReceiver = async (id: string) => {
  try {
    const response = await axios.delete(`/receiver/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response;
    } else {
      throw error;
    }
  }
};

export const getAllReceiversByClientId = async (id: string) => {
  try {
    const response = await axios.get(`/receiver/customer/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response;
    } else {
      throw error;
    }
  }
};

export const searchReceiver = async (search: any) => {
  try {
      const respnose = await axios.get(`/receiver/filters${search}`);
      return respnose.data;
  } catch (error: any) {
      if(error.response) {
          throw error.response.data;
      }
  }
}

export const searchReceiverByCustomerId = async (search: any, id: any) => {
  try {
      const respnose = await axios.get(`/receiver/filters/customer/${id}${search}`);
      return respnose.data;
  } catch (error: any) {
      if(error.response) {
          throw error.response.data;
      }
  }
}

