import { useMutation } from "react-query";
import axios from "axios";
import config from "../config";
import useAuthStore from "../stores/authStore";

const useLoginMutation = () => {
  const processAccessToken = useAuthStore((state) => state.processAccessToken);
  return useMutation(
    async ({ username, password }) => {
      const response = await axios.post(config.serverBaseUrl + "/auth/login", {
        username,
        password,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        processAccessToken(data.accessToken);
      },
    }
  );
};

export default useLoginMutation;
