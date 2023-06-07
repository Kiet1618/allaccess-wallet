import BN from "bn.js";
import * as EC from "elliptic";
import * as crypto from "crypto";
const ecInstance = new EC.ec("secp256k1");

export const generateRandomPrivateKey = (): BN => {
  return new BN(crypto.randomBytes(64).toString("hex"), "hex").umod(ecInstance.n as BN);
};
