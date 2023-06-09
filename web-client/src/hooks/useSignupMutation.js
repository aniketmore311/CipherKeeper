import { useMutation } from "react-query";
import axios from "axios";
import config from "../config";

const useSignupMutation = () => {
  return useMutation(async ({ username, password }) => {
    const response = await axios.post(config.serverBaseUrl + "/auth/signup", {
      username,
      password,
    });
    return response.data;
  });
};

export default useSignupMutation;
