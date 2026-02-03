import { useEffect, useState } from "react";
import type { User } from "../types/user";
import type { Transaction } from "../types/Transaction";
import type { ApiUser } from "../types/ApiUser";
import Card from "../component/Card";

interface DummyUserData {
  users: ApiUser[];
}

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currencies = ["BTC", "ETH", "USDT"] as const;
    const statuses = ["Pending", "Success", "Failed"] as const;
    const kycStatuses = ["Pending", "Approved", "Rejected"] as const;

    const fetchDashboardData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/users");
        if (!res.ok) throw new Error("Failed to fetch users");

        const data: DummyUserData = await res.json();

        const mappedUsers: User[] = data.users.map((u) => ({
          id: u.id,
          image: u.image,
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
          phone: u.phone,
          walletAddress: `0x${crypto.randomUUID()}`,
          kycStatus: kycStatuses[u.id % 3],
          accountStatus: u.id % 2 === 0 ? "Active" : "Blocked",
        }));

        const dummyTransactions: Transaction[] = Array.from({ length: 8 }, (_, i) => {
          const user = mappedUsers[i % mappedUsers.length];
          return {
            id: i + 1,
            txHash: `0x${crypto.randomUUID()}`,
            fromWallet: user.walletAddress,
            toWallet: `0x${crypto.randomUUID()}`,
            amount: parseFloat((Math.random() * 2).toFixed(4)),
            currency: currencies[i % currencies.length],
            status: statuses[i % statuses.length],
            user,
          };
        }
        );

        setUsers(mappedUsers);
        setTransactions(dummyTransactions);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
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

  const totalUsers = users.length;
  const pendingKYC = users.filter(u => u.kycStatus === "Pending").length;
  const totalWallets = users.length;
  const todayTx = transactions.length;

  return (
    <div>
      <h4 className="mb-4">
        <i className="bi bi-speedometer2"></i> Dashboard
      </h4>

      {/* STATS */}
      <div className="row g-3 mb-4">
        <Card title="Total Users" value={totalUsers} icon="people" />
        <Card title="Pending KYC" value={pendingKYC} icon="shield-exclamation" />
        <Card title="Wallets" value={totalWallets} icon="wallet2" />
        <Card title="24h Transactions" value={todayTx} icon="arrow-left-right" />
      </div>

      {/* RECENT TRANSACTIONS */}
      <div className="card bg-secondary text-light">
        <div className="card-body">
          <h6 className="mb-3 text-info">Recent Transactions</h6>

          <table className="table table-dark table-sm align-middle mb-0">
            <thead>
              <tr>
                <th>Tx Hash</th>
                <th>User</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id}>
                  <td className="text-info">{tx.txHash}</td>
                  <td>{tx.user.firstName}</td>
                  <td>
                    {tx.amount}{" "}
                    <span className="text-muted small">{tx.currency}</span>
                  </td>
                  <td>
                    <span
                      className={`badge ${tx.status === "Success"
                        ? "bg-success"
                        : tx.status === "Failed"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                        }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
