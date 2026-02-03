import { useUsers } from "../hooks/useUser";

const Users = () => {
  const { users, loading } = useUsers();
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
      <h4 className="mb-3"><i className="bi bi-person-fill"></i> Users</h4>

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
          {users.map(user => (
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
                  className={`badge ${user.kycStatus === "Approved"
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
                  className={`badge ${user.accountStatus === "Active"
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

}

export default Users