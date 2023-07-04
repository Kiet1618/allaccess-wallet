const sliceAddress = (str: string) => {
  if (str.length > 35) {
    return str.substr(0, 8) + "..." + str.substr(str.length - 5, str.length);
  }
  return str;
};
const copyAddress = (address: string, callback?: () => void) => {
  navigator.clipboard.writeText(address);
  if (callback && typeof callback === "function") callback();
};

export { sliceAddress, copyAddress };
