export const SignatureAlgorithm = {
  ECDSA_P256: 1,
  ECDSA_secp256k1: 2,
  BLS_BLS12_381: 3,
};

export const HashAlgorithm = {
  SHA2_256: 1,
  SHA2_384: 2,
  SHA3_256: 3,
  SHA3_384: 4,
  KMAC128_BLS_BLS12_381: 5,
  KECCAK_256: 6,
};
export const TransactionStatus = {
  Pending: 1,
  Finalized: 2,
  Executed: 3,
  Sealed: 4,
  Expired: 5,
};
