import { SHA3 } from "sha3";
import * as EC from "elliptic";
import { BN } from "bn.js";
const curve = new EC.ec("p256");

const hashMessageHex = (msgHex: string) => {
  const sha = new SHA3(256);
  sha.update(Buffer.from(msgHex, "hex"));
  return sha.digest();
};

const signWithKey = (privateKey: string, msgHex: string) => {
  const key = curve.keyFromPrivate(Buffer.from(privateKey, "hex"));
  const sig = key.sign(hashMessageHex(msgHex));
  const n = 32;
  const r = sig.r.toArrayLike(Buffer, "be", n);
  const s = sig.s.toArrayLike(Buffer, "be", n);

  return Buffer.concat([r, s]).toString("hex");
};

export const signer = async (account: any) => {
  const keyId = 0; // Ensure keyId is a number
  const accountAddress = "0x5593df7d286bcdb8";
  const pkey = "248f1ea7b4a058c39dcc97d91e6a5d0aa7afbc931428561b6efbc7bd0f5e0875";

  return {
    ...account,
    tempId: `${accountAddress}-${keyId}`,
    addr: accountAddress,
    keyId,
    signingFunction: async (signable: any) => {
      const signature = await signWithKey(pkey, signable.message);
      return {
        addr: account.addr,
        keyId,
        signature,
      };
    },
  };
};
