import axios from "axios";
import { get } from "lodash";
import { Ecies } from "@allaccessone/eccrypto";
import { METADATA_HOST } from "@app/configs";
import { DeviceInfo } from "@app/utils";
import { generatePublicKeyFromPrivateKey, generateRandomPrivateKey } from "./algorithm";

import { KeyPair } from "./types";

export type AdditionalTypes<T, Additional> = {
  [K in keyof T]: T[K] | Additional;
};

type ShareType = "network-key" | "device" | "recovery-phrase";

export type InfoMasterKey = {
  masterPrivateKey?: string;
  masterPublicKey: string;
  networkPublicKey: string; // Public key of Network key
  verifier: string; // google
  verifierId: string; // email
  mfa?: boolean;
  initialed?: boolean;
  shares?: ShareInfo[];
};

export type ShareInfo = {
  masterPublicKey: string;
  priKey?: string; // public key of key A,B,C
  publicKey: string; // public key of key A,B,C
  deviceInfo?: DeviceInfo;
  email: string; // check if type is recovery
  shareData?: AdditionalTypes<Ecies, string>;
  encryptedData?: AdditionalTypes<Ecies, string>;
  type: ShareType;
  deletedAt: Date;
};

export type GetInfoMasterKeyRequest = {
  publicKey: string;
};

export type GetInfoMasterKeyResponse = InfoMasterKey;

export type SetMasterKeyRequest = Partial<InfoMasterKey>;

export type SetMasterKeyResponse = InfoMasterKey;

export type GetSharesByMasterPublicKeyRequest = {
  masterPublicKey: string;
};

export type GetSharesByMasterPublicKeyResponse = ShareInfo[];

export type InitialSharesRequest = {
  masterPublicKey: string;
  networkPublicKey: string;
  signature: string;
  shares: Partial<ShareInfo>[];
  encryptedData: AdditionalTypes<Ecies, string>;
};

export type InitialSharesResponse = ShareInfo[];

export type CreateShareRequest = {
  masterPublicKey: string;
  publicKey: string;
  signature?: string;
  deviceInfo?: DeviceInfo;
  email?: string;
  type: ShareType;
  encryptedData?: AdditionalTypes<Ecies, string>;
};

export type CreateShareResponse = ShareInfo;

export type EnableMasterKeyMFARequest = {
  masterPublicKey: string;
  networkPublicKey: string;
  signature: string;
  networkShare: Partial<ShareInfo>;
  deviceShare: Partial<ShareInfo>;
  recoveryShare: Partial<ShareInfo>;
  encryptedData: AdditionalTypes<Ecies, string>;
};

export type EnableMasterKeyMFAResponse = boolean;

export type PSSAllSharesRequest = {
  masterPublicKey: string;
  networkPublicKey: string;
  signature: string;
  networkShare?: Partial<ShareInfo> | null;
  deviceShares?: Partial<ShareInfo>[];
  recoveryShare?: Partial<ShareInfo> | null;
  encryptedData: AdditionalTypes<Ecies, string>;
};

export type PSSAllSharesResponse = boolean;

export type GetGoogleTokenRequest = {
  code: string;
};

export type GetGoogleTokenResponse = {
  id_token: string;
  [key: string]: string;
};

export type SendMailPhraseRequest = {
  email: string;
  phrase: string;
};

export type SendMailPhraseResponse = boolean;

export type InsertTokenFCMRequest = {
  token: string;
  masterPublicKey: string;
};

export type InsertTokenFCMResponse = boolean;

export const setInfoMasterKey = async (payload: SetMasterKeyRequest): Promise<{ error: string; data: SetMasterKeyRequest | null }> => {
  try {
    const { data } = await axios.post<SetMasterKeyRequest>(`${METADATA_HOST}/info-keys`, payload);
    return { error: "", data };
  } catch (error) {
    return {
      error: get(error, "response.data.message") || get(error, "response.data.message.0") || get(error, "message", "Unknown"),
      data: null,
    };
  }
};

export const getInfoMasterKey = async (networkKey: KeyPair): Promise<{ error: string; data: InfoMasterKey | null }> => {
  try {
    const { data: existed } = await axios.get<GetInfoMasterKeyResponse>(`${METADATA_HOST}/info-keys`, {
      params: {
        publicKey: networkKey.pubKey,
      },
    });

    return {
      error: "",
      data: existed,
    };
  } catch (error) {
    return {
      error: get(error, "response.data.message") || get(error, "response.data.message.0") || get(error, "message", "Unknown"),
      data: null,
    };
  }
};

export const getOrSetInfoMasterKey = async (verifier: string, verifierId: string, networkKey: KeyPair): Promise<{ error: string; data: InfoMasterKey | null }> => {
  try {
    const { pubKey } = networkKey;
    const { data: existed } = await axios.get<GetInfoMasterKeyResponse>(`${METADATA_HOST}/info-keys`, {
      params: {
        publicKey: networkKey.pubKey,
      },
    });
    if (existed?.initialed) {
      return { error: "", data: existed };
    }
    // Get info master key or create
    const randomPrivateKey = generateRandomPrivateKey();
    const { data: created } = await axios.post<SetMasterKeyRequest>(`${METADATA_HOST}/info-keys`, {
      verifier,
      verifierId,
      networkPublicKey: pubKey,
      // Api will handle create if info not exsited
      masterPublicKey: generatePublicKeyFromPrivateKey(randomPrivateKey).toString("hex").padStart(130, "0"),
    });

    return {
      error: "",
      data: {
        ...created,
        masterPrivateKey: randomPrivateKey.toString("hex"),
      } as InfoMasterKey,
    };
  } catch (error) {
    return {
      error: get(error, "response.data.message") || get(error, "response.data.message.0") || get(error, "message", "Unknown"),
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
      error: get(error, "response.data.message") || get(error, "response.data.message.0") || get(error, "message", "Unknown"),
      data: [],
    };
  }
};

export const initialedShares = async (payload: InitialSharesRequest): Promise<{ error: string; data: InitialSharesResponse }> => {
  try {
    const { data } = await axios.post<InitialSharesResponse>(`${METADATA_HOST}/info-keys/initial-shares`, {
      ...payload,
    });
    return { error: "", data };
  } catch (error) {
    return {
      error: get(error, "response.data.message") || get(error, "response.data.message.0") || get(error, "message", "Unknown"),
      data: [],
    };
  }
};

export const createShare = async (payload: CreateShareRequest): Promise<{ error: string; data?: CreateShareResponse }> => {
  try {
    const { data } = await axios.post<CreateShareResponse>(`${METADATA_HOST}/shares`, {
      ...payload,
    });
    return { error: "", data };
  } catch (error) {
    return {
      error: get(error, "response.data.message") || get(error, "response.data.message.0") || get(error, "message", "Unknown"),
    };
  }
};

export const enabledMasterKeyMFA = async (payload: EnableMasterKeyMFARequest): Promise<{ error: string; data: EnableMasterKeyMFAResponse }> => {
  try {
    const { data } = await axios.post<EnableMasterKeyMFAResponse>(`${METADATA_HOST}/info-keys/enable/mfa`, {
      ...payload,
    });
    return { error: "", data };
  } catch (error) {
    return {
      error: get(error, "response.data.message") || get(error, "response.data.message.0") || get(error, "message", "Unknown"),
      data: false,
    };
  }
};

export const pssAllShares = async (payload: PSSAllSharesRequest): Promise<{ error: string; data: PSSAllSharesResponse }> => {
  try {
    const { data } = await axios.patch<PSSAllSharesResponse>(`${METADATA_HOST}/shares/pss`, {
      ...payload,
    });
    return { error: "", data };
  } catch (error) {
    return {
      error: get(error, "response.data.message") || get(error, "response.data.message.0") || get(error, "message", "Unknown"),
      data: false,
    };
  }
};

export const sendMailPhrase = async (payload: SendMailPhraseRequest): Promise<{ error: string; data: SendMailPhraseResponse }> => {
  try {
    const { data } = await axios.post<SendMailPhraseResponse>(`${METADATA_HOST}/mailer/phrase`, {
      ...payload,
    });
    return { error: "", data };
  } catch (error) {
    return {
      error: get(error, "response.data.message") || get(error, "response.data.message.0") || get(error, "message", "Unknown"),
      data: false,
    };
  }
};

export const getGoogleToken = async (payload: GetGoogleTokenRequest): Promise<{ error: string; data?: GetGoogleTokenResponse }> => {
  try {
    const { data } = await axios.post<GetGoogleTokenResponse>(`${METADATA_HOST}/oauth/google`, {
      ...payload,
    });
    return { error: "", data };
  } catch (error) {
    return {
      error: get(error, "response.data.message") || get(error, "response.data.message.0") || get(error, "message", "Unknown"),
    };
  }
};

export const insertTokenByMasterPublicKey = async (payload: InsertTokenFCMRequest): Promise<{ error: string; data?: InsertTokenFCMResponse }> => {
  try {
    const { data } = await axios.post<InsertTokenFCMResponse>(`${METADATA_HOST}/info-keys/add/token-fcm`, {
      ...payload,
    });
    return { error: "", data };
  } catch (error) {
    return {
      error: get(error, "response.data.message") || get(error, "response.data.message.0") || get(error, "message", "Unknown"),
    };
  }
};
