import { EmptyWallet, ReceiptSearch, Setting } from "../../assets/icon";

export const listMenu = [
  {
    name: "My Wallet",
    icon: EmptyWallet,
    subMenu: [
      { name: "Overview", route: "/overview" },
      { name: "Transaction", route: "/transaction" },
    ],
  },
  {
    name: "History",
    icon: ReceiptSearch,
    subMenu: [{ name: "History", route: "/history" }],
  },
  {
    name: "Setting",
    icon: Setting,
    subMenu: [
      { name: "User profile", route: "/profile" },
      { name: "Logout", route: "" },
    ],
  },
];
