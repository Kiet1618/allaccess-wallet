import Web3 from "web3";
export const formatValue = (web3: Web3, value: string) => {
  try {
    const formatBalance = web3.utils.fromWei(value, "ether");
    return formatBalance.slice(0, 5);
  } catch {
    return value;
  }
};
