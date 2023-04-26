export const route = { overview: '/overview', login: '/login', transaction: '/transaction' }

export const listMenu = [
    {
        name: "My Wallet",
        subMenu: [
            { name: "Overview", route: route.overview },
            { name: "Transaction", route: route.transaction }
        ]
    },
    {
        name: "History",
        subMenu: [
            { name: "Overview", route: route.overview },
            { name: "Transaction", route: route.transaction }
        ]
    },
    {
        name: "Setting",
        subMenu: [
            { name: "Overview", route: route.overview },
            { name: "Transaction", route: route.transaction }
        ]
    }
]