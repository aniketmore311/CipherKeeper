import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useUpdatePasswordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ passwordId, encryptedName, encryptedPassword }) => {
      const accessToken = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      await axios.patch(
        `/passwords/${passwordId}`,
        { encryptedName, encryptedPassword },
        { headers }
      );
      await queryClient.invalidateQueries("passwords");
    }
  );
};

export default useUpdatePasswordMutation;
