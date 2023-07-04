import numeral from "numeral";
export const formatBalance = (balance: number | string): string => {
  const formattedBalance = numeral(balance).format("0,0.[000000]");
  return formattedBalance;
};
