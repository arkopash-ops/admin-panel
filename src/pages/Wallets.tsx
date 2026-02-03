import { useEffect, useState } from "react";
import type { Wallet } from "../types/Wallet";
import { fetchUsers } from "../services/userService";
import { generateWallets } from "../services/walletService";

const Wallets = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

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

  const filteredWallets = wallets.filter(wallet => {
    const q = search.toLowerCase();

    return (
      wallet.user.walletAddress.toLowerCase().includes(q) ||
      `${wallet.user.firstName} ${wallet.user.lastName}`
        .toLowerCase()
        .includes(q)
    );
  });

  return (
    <div>
      <h4 className="mb-3">
        <i className="bi bi-wallet2"></i> Wallets
      </h4>

      {/* SEARCH BAR */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            className="form-control form-control-dark"
            placeholder="Search user or wallet address..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

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
          {filteredWallets.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-muted py-4">
                No wallets found
              </td>
            </tr>
          )}

          {filteredWallets.map(wallet => (
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
