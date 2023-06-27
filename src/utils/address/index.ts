const sliceAddress = (str: string) => {
  if (str.length > 35) {
    return str.substr(0, 8) + "..." + str.substr(str.length - 5, str.length);
  }
  return str;
};
const copyAddress = (address: string, setStatus: React.Dispatch<React.SetStateAction<boolean>>) => {
  navigator.clipboard.writeText(address);
  setStatus(true);
  setTimeout(() => setStatus(false), 5000);
};

export { sliceAddress, copyAddress };
