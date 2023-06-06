import BN from "bn.js";
import * as EC from "elliptic";
import * as crypto from "crypto";
const ecInstance = new EC.ec("secp256k1");
const nodeIndex: BN[] = [new BN(1), new BN(2), new BN(3)];
function generateSharesLagrangeInterpolation(shares: BN[], nodeIndex: BN[], priKey: BN): BN | undefined {
  let index = 0;
  let secret = new BN(0);
  for (let i = index; i <= shares.length; i += 1) {
    let upper = new BN(1);
    let lower = new BN(1);
    for (let j = index; j <= shares.length; j += 1) {
      if (i !== j) {
        upper = upper.mul(nodeIndex[j].neg());
        let temp = nodeIndex[i].sub(nodeIndex[j]);
        lower = lower.mul(temp);
      }
    }
    let delta = upper.div(lower);
    if (i == shares.length) {
      index++;
      let delta2 = priKey.sub(secret);
      let share = delta2.div(delta);
      return share.umod(ecInstance.n as BN);
    }
    delta = delta.mul(shares[i]);
    secret = secret.add(delta);
  }
}
const shares = (priKey: BN) => {
  let temp: BN[] = [new BN(crypto.randomBytes(64).toString("hex"), "hex").umod(ecInstance.n as BN)];
  temp[1] = generateSharesLagrangeInterpolation(temp, nodeIndex, priKey) as BN;
  return temp;
};

export { shares };
