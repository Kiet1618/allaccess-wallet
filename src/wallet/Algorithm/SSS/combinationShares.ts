import BN from "bn.js";
import * as EC from "elliptic";
const ec = new EC.ec("secp256k1");

export const lagrangeInterpolation = (shares: BN[], nodeIndex: BN[]): BN | null => {
  if (shares.length !== nodeIndex.length) {
    return null;
  }
  try {
    let secret = new BN(0);
    for (let i = 0; i < shares.length; i += 1) {
      let upper = new BN(1);
      let lower = new BN(1);
      for (let j = 0; j < shares.length; j += 1) {
        if (i !== j) {
          upper = upper.mul(nodeIndex[j].neg());
          upper = upper.umod(ec.n as BN);
          let temp = nodeIndex[i].sub(nodeIndex[j]);
          temp = temp.umod(ec.n as BN);
          lower = lower.mul(temp).umod(ec.n as BN);
        }
      }
      let delta = upper.mul(lower.invm(ec.n as BN)).umod(ec.n as BN);
      delta = delta.mul(shares[i]);
      secret = secret.add(delta);
    }
    return secret.umod(ec.n as BN);
  } catch {
    return null;
  }
};

export const combineTest1 = (masterPublicKey: BN): any => {
  return "key";
};
