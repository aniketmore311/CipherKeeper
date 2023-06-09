import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useCreatePasswordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(async ({ encryptedName, encryptedPassword }) => {
    const accessToken = localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    await axios.post(
      "/passwords",
      { encryptedName, encryptedPassword },
      { headers }
    );
    await queryClient.invalidateQueries("passwords");
  });
};

export default useCreatePasswordMutation;
