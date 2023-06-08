import axios from "axios";
import { get } from "lodash";
import { METADATA_HOST } from "@app/configs";

export type InfoMasterKey = {
  masterPublicKey: string;
  networkPublicKey: string; // Public key of Network key
  verifier: string; // google
  verifierId: string; // email
};

export type GetOrSetMasterKeyRequest = Partial<InfoMasterKey>;

export type GetOrSetMasterKeyResponse = InfoMasterKey;

export const getOrSetInfoMasterKey = async (payload: GetOrSetMasterKeyRequest): Promise<{ error: string; data: GetOrSetMasterKeyResponse | null }> => {
  try {
    const { data } = await axios.post<GetOrSetMasterKeyResponse>(`${METADATA_HOST}/info-keys`, payload);
    return { error: "", data };
  } catch (error) {
    return {
      error: get(error, "response.data.message.0") || get(error, "message", "Unknown"),
      data: null,
    };
  }
};
