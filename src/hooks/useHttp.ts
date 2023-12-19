import axios from "axios";

export const useHttp = () => {
  const request = async (url: string) => {
    try {
      const response = await axios.get(`http://localhost:3100/${url}`);
      return response.data;
    } catch (e) {
      throw e;
    }
  };
  return { request };
};
