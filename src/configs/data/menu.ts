import { EmptyWallet, ReceiptSearch, Setting } from '../../assets/icon';

export const route = {
    overview: '/overview',
    login: '/login',
    transaction: '/transaction',
    history: '/history',
    profile: '/profile'
}
export const listMenu = [
    {
        name: "My Wallet",
        icon: EmptyWallet,
        subMenu: [
            { name: "Overview", route: route.overview },
            { name: "Transaction", route: route.transaction }
        ]
    },
    {
        name: "History",
        icon: ReceiptSearch,

        subMenu: [
            { name: "History", route: route.history }
        ]
    },
    {
        name: "Setting",
        icon: Setting,
        subMenu: [
            { name: "User profile", route: route.profile },
            { name: "Logout", route: "" }
        ]
    }
]