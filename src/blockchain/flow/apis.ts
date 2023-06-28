import { BLOCKCHAIN_SUPPORT_HOST } from "@app/configs";
import axios from "axios";
import { get } from "lodash";

export type CreateFlowAccountRequest = {
  publicKey: string;
  hashAlgo?: number;
  signAlgo?: number;
};

export type CreateFlowAccountResponse = string;

export const createFlowAccount = async (payload: CreateFlowAccountRequest): Promise<{ error: string; data: CreateFlowAccountResponse }> => {
  try {
    const { data } = await axios.post<CreateFlowAccountResponse>(`${BLOCKCHAIN_SUPPORT_HOST}/flow/create-account`, {
      ...payload,
    });
    return { error: "", data };
  } catch (error) {
    return {
      error: get(error, "response.data.message") || get(error, "response.data.message.0") || get(error, "message", "Unknown"),
      data: "",
    };
  }
};
