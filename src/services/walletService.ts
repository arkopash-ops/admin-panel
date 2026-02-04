import type { Wallet } from "../types/Wallet";
import type { User } from "../types/User";

export const generateWallets = (users: User[]): Wallet[] => {
  return users.slice(0, 15).map(user => ({
    id: user.id,
    user,
    balances: {
      BTC: +(Math.random() * 1).toFixed(4),
      ETH: +(Math.random() * 5).toFixed(4),
      USDT: +(Math.random() * 5000).toFixed(2),
    },
    lastActivity: new Date(
      Date.now() - Math.random() * 1e10
    ).toLocaleDateString(),
  }));
};
