import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useDeletePasswordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(async (passwordId) => {
    const accessToken = localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    await axios.delete(`/passwords/${passwordId}`, { headers });
    await queryClient.invalidateQueries("passwords");
  });
};

export default useDeletePasswordMutation;
