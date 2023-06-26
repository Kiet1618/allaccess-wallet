import * as sharmir from "shamirs-secret-sharing-ts";

export const sharmirSplitPrivateKey = (masterPublicKey: Buffer): Buffer[] => {
  const shares = sharmir.split(masterPublicKey, { shares: 3, threshold: 2 });
  return shares;
};

export const sharmirCombinePrivateKey = (shares: Buffer[]): Buffer => {
  const privKey = sharmir.combine(shares);
  return privKey;
};
