import axios from "axios";
import { get } from "lodash";
import { Ecies } from "@allaccessone/eccrypto";
import { METADATA_HOST } from "@app/configs";

type ShareType = "network-key" | "device" | "recovery-phrase";

export type InfoMasterKey = {
  masterPublicKey: string;
  networkPublicKey: string; // Public key of Network key
  verifier: string; // google
  verifierId: string; // email
  mfa?: boolean; // email
};

export type ShareInfo = {
  masterPublicKey: string;
  publicKey: string; // public key of key A,B,C
  deviceInfo: string;
  email: string; // check if type is recovery
  shareData: Omit<Ecies, "string">;
  type: ShareType;
  deletedAt: Date;
};

export type GetOrSetMasterKeyRequest = Partial<InfoMasterKey>;

export type GetOrSetMasterKeyResponse = InfoMasterKey;

export type GetSharesByMasterPublicKeyRequest = {
  masterPublicKey: string;
};

export type GetSharesByMasterPublicKeyResponse = ShareInfo[];

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

export const getSharesByMasterPublicKey = async (payload: GetSharesByMasterPublicKeyRequest): Promise<{ error: string; data: GetSharesByMasterPublicKeyResponse }> => {
  try {
    const { data } = await axios.get<GetSharesByMasterPublicKeyResponse>(`${METADATA_HOST}/shares/${payload.masterPublicKey.toLowerCase()}/by-masterPublicKey`);
    return { error: "", data };
  } catch (error) {
    return {
      error: get(error, "response.data.message.0") || get(error, "message", "Unknown"),
      data: [],
    };
  }
};
