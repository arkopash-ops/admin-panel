import type { Currency } from "./Currency";
import type { User } from "./User";

export interface Wallet {
    id: number;
    user: User;
    balances: Record<Currency, number>;
    lastActivity: string;
}