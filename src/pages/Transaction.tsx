import { useEffect, useState } from "react";
import type { Transaction } from "../types/Transaction";
import type { User } from "../types/user";
import type { ApiUser } from "../types/ApiUser";

interface dummyUserData {
  users: ApiUser[];
}

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      const currencies = ["BTC", "ETH", "USDT"] as const;
      const statuses = ["Pending", "Success", "Failed"] as const;

      try {
        const res = await fetch("https://dummyjson.com/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data: dummyUserData = await res.json();

        const users: User[] = data.users.map((u) => ({
          id: u.id,
          image: u.image,
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
          phone: u.phone,
          walletAddress: `0x${crypto.randomUUID()}`,
          kycStatus: "Approved",
          accountStatus: "Active",
        }));

        // dummy transactions
        const dummyTransactions: Transaction[] = Array.from({ length: 15 }, (_, i) => {
          const myUser = users[i % users.length];
          const toUser = users[(i + 1) % users.length];
          return {
            id: i + 1,
            txHash: `0x${crypto.randomUUID()}`,
            fromWallet: myUser.walletAddress,
            toWallet: toUser.walletAddress,
            amount: parseFloat((Math.random() * 2).toFixed(3)),
            currency: currencies[i % currencies.length],
            status: statuses[i % statuses.length],
            user: myUser,
          };
        });

        setTransactions(dummyTransactions);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
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
