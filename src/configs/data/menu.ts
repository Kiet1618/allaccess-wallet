import { EmptyWallet, ReceiptSearch, Setting } from "../../assets/icon";

export const listMenu = [
  {
    name: "My Wallet",
    icon: EmptyWallet,
    key: "wallet",
    subMenu: [
      { name: "Overview", route: "/overview", key: "overview" },
      { name: "Transaction", route: "/transaction", key: "transaction" },
    ],
  },
  {
    name: "History",
    key: "history",
    icon: ReceiptSearch,
    subMenu: [{ name: "History", route: "/history", key: "history" }],
  },
  {
    name: "Setting",
    icon: Setting,
    key: "setting",
    subMenu: [
      { name: "User profile", route: "/profile", key: "profile" },
      { name: "Logout", route: "/", key: "logout" },
    ],
  },
];
