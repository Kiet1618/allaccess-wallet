import { lagrangeInterpolation } from "./combinationShares";
import BN from "bn.js";

const nodeIndex = [
  new BN(1),
  // new BN(2),
  //new BN(3),
  new BN(4),
  new BN(5),
];

const shares = [
  new BN("a93fe7a4920c65cf9c735197492bfc8e2524dd9f61bbc58f513a9374607bdba9", "hex"),
  //new BN("da471ed639135e49c75e31d84a972c593ac363f6571754985b09e27dbbd4fa0c", "hex"),
  //new BN("91d46066b682550d4fde0d1d29444efec714b7d9f2989b161ca941bf9cc05fa", "hex"),
  new BN("ccd80a19b0828cff3e6efdc851bc06e0cdc818fd4a924d8728c326fb853bb24b", "hex"),
  new BN("4870316e85e54f4c30a7fe4fa28631fee2e1910ff535bcbdef375e73ef6e9635", "hex"),
];
const combinationKey = "d1d4d55fdcb0dfccd59df533eeb761fc9d18373712584cb87fe6892b22edb27";
console.log(lagrangeInterpolation(shares, nodeIndex));
