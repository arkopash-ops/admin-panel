import type { User } from "./user";

export interface Transaction {
    id: number;
    txHash: string;
    fromWallet: string;
    toWallet: string;
    amount: number;
    currency: "BTC" | "ETH" | "USDT";
    status: "Pending" | "Success" | "Failed";
    user: User;
}
