import { useEffect, useState } from "react";
import type { User } from "../types/User";
import type { Transaction } from "../types/Transaction";
import { fetchUsers } from "../services/userService";
import { generateTransactions } from "../services/transactionService";
import Card from "../component/Card";

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const usersData = await fetchUsers();
        const txData = generateTransactions(usersData).slice(0, 8);

        setUsers(usersData);
        setTransactions(txData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-info" />
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
        <i className="bi bi-window-desktop"></i> Dashboard
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
                    <span className="text-muted small">
                      {tx.currency}
                    </span>
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
