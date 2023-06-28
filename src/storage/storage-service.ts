import { KeyPair } from "../wallet/types";
import { Profile } from "@app/store/redux/profile/types";
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
      const data = win.localStorage.getItem("master-key");
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

export const getProfileInfo = (): Profile => {
  try {
    if (typeof win !== "undefined") {
      const data = win.sessionStorage.getItem("profileInfo");
      if (typeof data === "string") {
        return JSON.parse(data);
      }
    }
    return {
      userName: "",
      email: "",
      avatar: "",
    };
  } catch {
    return {
      userName: "",
      email: "",
      avatar: "",
    };
  }
};
