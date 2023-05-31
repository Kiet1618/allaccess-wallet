import Web3 from "web3";
export const getGasPrice = async (web3: Web3) => {
  const price = await web3.eth.getGasPrice();
  const ethValue = Math.round((parseInt(price, 16) / 10 ** 18) * 1000000) / 1000000;
  return ethValue;
};

export const getCurrentBlock = async (web3: Web3) => {
  return await web3.eth.getBlockNumber();
};
