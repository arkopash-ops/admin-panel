import type { Transaction } from "../types/Transaction";
import type { User } from "../types/user";

const currencies = ["BTC", "ETH", "USDT"] as const;
const statuses = ["Pending", "Success", "Failed"] as const;

export const generateTransactions = (users: User[]): Transaction[] => {
    return Array.from({ length: 15 }, (_, i) => {
        const fromUser = users[i % users.length];
        const toUser = users[(i + 1) % users.length];

        return {
            id: i + 1,
            txHash: `0x${crypto.randomUUID()}`,
            fromWallet: fromUser.walletAddress,
            toWallet: toUser.walletAddress,
            amount: parseFloat((Math.random() * 2).toFixed(3)),
            currency: currencies[i % currencies.length],
            status: statuses[i % statuses.length],
            user: fromUser,
        };
    });
};
