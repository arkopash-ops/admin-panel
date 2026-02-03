import { useEffect, useState } from "react";
import type { Transaction } from "../types/Transaction";
import { generateTransactions } from "../services/transactionService";
import { fetchUsers } from "../services/userService";

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const users = await fetchUsers();
        const txs = generateTransactions(users);
        setTransactions(txs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
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
      <h4 className="mb-3"><i className="bi bi-currency-bitcoin"></i> Transactions</h4>

      <table className="table table-dark table-hover align-middle">
        <thead>
          <tr>
            <th>TX Hash</th>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id}>
              <td className="text-info">{tx.txHash}</td>
              <td className="d-flex align-items-center gap-2">
                <img
                  src={tx.user.image || "https://via.placeholder.com/40"}
                  alt="user"
                  width={40}
                  height={40}
                  className="rounded-circle"
                />
                {tx.user.firstName} {tx.user.lastName}
              </td>
              <td>{tx.toWallet}</td>
              <td>{tx.amount}</td>
              <td>{tx.currency}</td>
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
  );
};

export default Transactions;
