import { useQuery } from "react-query";
import axios from "axios";

const useGetAllPasswordsQuery = () => {
  return useQuery("passwords", async () => {
    const accessToken = localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.get("/passwords", { headers });
    return response.data;
  });
};

export default useGetAllPasswordsQuery;
