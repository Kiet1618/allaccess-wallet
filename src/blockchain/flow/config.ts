import { config, query, mutate, tx } from "@onflow/fcl";
import { signer } from "./signer";

// Contrary to our wallet signing example, we don't need most of it in our config now
// so we'll get back to simple version
config({
  "accessNode.api": "https://rest-testnet.onflow.org",
  "0xBasic": "0xafabe20e55e9ceb6",
});
