import { useEffect, useState } from "react";
import type { User } from "../types/user";
import type { ApiUser } from "../types/ApiUser";
import type { Wallet } from "../types/Wallet";

interface DummyUserData {
  users: ApiUser[];
}

const Wallets = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const res = await fetch("https://dummyjson.com/users");
        if (!res.ok) throw new Error("Failed to fetch users");

        const data: DummyUserData = await res.json();

        const users: User[] = data.users.map((u) => ({
          id: u.id,
          image: u.image,
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
          phone: u.phone,
          walletAddress: `0x${crypto.randomUUID().replace(/-/g, "")}`,
          kycStatus: "Approved",
          accountStatus: "Active",
        }));

        const dummyWallets: Wallet[] = users.slice(0, 15).map((user) => ({
          id: user.id,
          user,
          balances: {
            BTC: parseFloat((Math.random() * 1).toFixed(4)),
            ETH: parseFloat((Math.random() * 5).toFixed(4)),
            USDT: parseFloat((Math.random() * 5000).toFixed(2)),
          },
          lastActivity: new Date(
            Date.now() - Math.random() * 1e10
          ).toLocaleDateString(),
        }));

        setWallets(dummyWallets);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWallets();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
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
          {wallets.map((wallet) => (
            <tr key={wallet.id}>
              <td className="d-flex align-items-center gap-2">
                <img
                  src={wallet.user.image}
                  alt="user"
                  width={40}
                  height={40}
                  className="rounded-circle"
                />
                {wallet.user.firstName} {wallet.user.lastName}
              </td>

              <td className="text-info">{wallet.user.walletAddress}</td>

              <td>{wallet.balances.BTC}</td>
              <td>{wallet.balances.ETH}</td>
              <td>{wallet.balances.USDT}</td>

              <td className="text-Secondary">{wallet.lastActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Wallets;
