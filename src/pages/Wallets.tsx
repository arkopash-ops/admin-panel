import { useEffect, useState } from "react";
import type { Wallet } from "../types/Wallet";
import { fetchUsers } from "../services/userService";
import { generateWallets } from "../services/walletService";

const Wallets = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWallets = async () => {
      try {
        const users = await fetchUsers();
        const walletsData = generateWallets(users);
        setWallets(walletsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadWallets();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-info" />
      </div>
    );
  }

  return (
    <div>
      <h4 className="mb-3">
        <i className="bi bi-wallet2"></i> Wallets
      </h4>

      <table className="table table-dark table-hover align-middle">
        <thead>
          <tr>
            <th>User</th>
            <th>Wallet Address</th>
            <th>BTC</th>
            <th>ETH</th>
            <th>USDT</th>
            <th>Last Activity</th>
          </tr>
        </thead>

        <tbody>
          {wallets.map(wallet => (
            <tr key={wallet.id}>
              <td className="d-flex align-items-center gap-2">
                <img
                  src={wallet.user.image}
                  width={40}
                  height={40}
                  className="rounded-circle"
                />
                {wallet.user.firstName} {wallet.user.lastName}
              </td>

              <td className="text-info">
                {wallet.user.walletAddress}
              </td>

              <td>{wallet.balances.BTC}</td>
              <td>{wallet.balances.ETH}</td>
              <td>{wallet.balances.USDT}</td>

              <td>{wallet.lastActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Wallets;
