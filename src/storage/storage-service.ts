import { KeyPair } from "../wallet/types";
function getWindow(): Window | undefined {
  try {
    if (typeof window !== "undefined") return window;
  } catch (e) {
    console.log(e);
  }
}

const win = getWindow();

export const getListTokens = () => {
  try {
    if (typeof win !== "undefined") {
      const data = win.localStorage.getItem("currentListTokens");
      if (typeof data === "string") {
        return JSON.parse(data);
      }
    }
    return null;
  } catch {
    return null;
  }
};

export const getTorusKey = (): KeyPair => {
  try {
    if (typeof win !== "undefined") {
      const data = win.localStorage.getItem("torusKey");
      if (typeof data === "string") {
        return JSON.parse(data);
      }
    }
    return {
      ethAddress: "",
      priKey: "",
      pubKey: "",
    };
  } catch {
    return {
      ethAddress: "",
      priKey: "",
      pubKey: "",
    };
  }
};
