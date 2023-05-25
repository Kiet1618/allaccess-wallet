import { Route } from "../../types/blockchain.type";
export const routes: Array<Route> = [
  {
    path: "/overview",
    breadcrumbName: "Overview",
    layout: true,
  },
  {
    path: "/",
    breadcrumbName: "",
    layout: false,
  },
  {
    path: "/multiple-factors",
    breadcrumbName: "",
    layout: false,
  },
  {
    path: "/transaction",
    breadcrumbName: "Transaction",
    layout: true,
  },
  {
    path: "/history",
    breadcrumbName: "Transactions history",
    layout: true,
  },
  {
    path: "/profile",
    breadcrumbName: "User profile",
    layout: true,
  },
];
