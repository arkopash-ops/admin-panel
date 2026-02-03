import { useEffect, useState } from "react";
import type { Transaction } from "../types/Transaction";
import { generateTransactions } from "../services/transactionService";
import { fetchUsers } from "../services/userService";

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [currencyFilter, setCurrencyFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

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

  const filteredTransactions = transactions.filter(tx => {
    const q = search.toLowerCase();

    const matchesSearch =
      tx.txHash.toLowerCase().includes(q) ||
      tx.fromWallet.toLowerCase().includes(q) ||
      tx.toWallet.toLowerCase().includes(q) ||
      `${tx.user.firstName} ${tx.user.lastName}`.toLowerCase().includes(q);

    const matchesCurrency =
      currencyFilter === "All" || tx.currency === currencyFilter;

    const matchesStatus =
      statusFilter === "All" || tx.status === statusFilter;

    return matchesSearch && matchesCurrency && matchesStatus;
  });

  return (
    <div>
      <h4 className="mb-3">
        <i className="bi bi-currency-bitcoin"></i> Transactions
      </h4>

      {/* FILTER BAR */}
      <div className="row g-2 mb-3">
        <div className="col-md-4">
          <input
            className="form-control form-control-dark"
            placeholder="Search tx, wallet or user..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-select form-select-dark"
            value={currencyFilter}
            onChange={e => setCurrencyFilter(e.target.value)}
          >
            <option value="All">All Currencies</option>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="USDT">USDT</option>
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-select form-select-dark"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
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
          {filteredTransactions.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-muted py-4">
                No transactions found
              </td>
            </tr>
          )}

          {filteredTransactions.map(tx => (
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
                  className={`badge ${
                    tx.status === "Success"
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
