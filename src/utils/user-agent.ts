import axios from "axios";
import { detect } from "detect-browser";

export type DeviceInfo = {
  os: string;
  version?: string;
  ipv4: string;
};
export const getIpv4 = async (): Promise<string> => {
  try {
    const { data } = await axios.get<string>("https://api.ipify.org");
    return data;
  } catch (error) {
    return "Unknown";
  }
};

export const deviceInfo = async (): Promise<DeviceInfo> => {
  const browser = detect();
  return {
    os: browser?.os || "",
    version: browser?.version || "",
    ipv4: await getIpv4(),
  };
};
