import { useState } from "react";
import { useUsers } from "../hooks/useUser";

const Users = () => {
  const { users, loading } = useUsers();

  const [search, setSearch] = useState("");
  const [kycFilter, setKycFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const wallet = user.walletAddress.toLowerCase();

    const matchesSearch =
      fullName.includes(search.toLowerCase()) ||
      wallet.includes(search.toLowerCase());

    const matchesKyc =
      kycFilter === "All" || user.kycStatus === kycFilter;

    const matchesStatus =
      statusFilter === "All" || user.accountStatus === statusFilter;

    return matchesSearch && matchesKyc && matchesStatus;
  });

  return (
    <div>
      <h4 className="mb-3">
        <i className="bi bi-person-fill"></i> Users
      </h4>

      {/* FILTER BAR */}
      <div className="row g-2 mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control form-control-dark"
            placeholder="Search name or wallet..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-select form-select-dark"
            value={kycFilter}
            onChange={e => setKycFilter(e.target.value)}
          >
            <option value="All">All KYC</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-select form-select-dark"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <table className="table table-dark table-hover align-middle">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Wallet</th>
            <th>KYC</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-muted py-4">
                No users found
              </td>
            </tr>
          )}

          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td className="d-flex align-items-center gap-2">
                <img
                  src={user.image}
                  alt="user"
                  width={40}
                  height={40}
                  className="rounded-circle"
                />
                {user.firstName} {user.lastName}
              </td>

              <td>{user.email}</td>

              <td className="text-info">{user.walletAddress}</td>

              <td>
                <span
                  className={`badge ${
                    user.kycStatus === "Approved"
                      ? "bg-success"
                      : user.kycStatus === "Rejected"
                      ? "bg-danger"
                      : "bg-warning text-dark"
                  }`}
                >
                  {user.kycStatus}
                </span>
              </td>

              <td>
                <span
                  className={`badge ${
                    user.accountStatus === "Active"
                      ? "bg-success"
                      : "bg-secondary"
                  }`}
                >
                  {user.accountStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
