function getWindow(): Window | undefined {
  try {
    if (typeof window !== "undefined") return window;
  } catch (e) {
    console.log(e);
  }
}

const win = getWindow();

export const getListTokens = () => {
  try {
    if (typeof win !== "undefined") {
      const data = win.localStorage.getItem("currentListTokens");
      if (typeof data === "string") {
        return JSON.parse(data);
      }
    }
    return null;
  } catch {
    return null;
  }
};
