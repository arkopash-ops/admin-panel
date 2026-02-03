import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (username === "Admin124" && password === "admin@124") {
            localStorage.setItem("isAdminLoggedIn", "true");
            navigate("/dashboard");
        } else {
            setError("Invalid admin credentials");
        }
    };

    return (
        <div className="container-fluid bg-dark text-light min-vh-100 d-flex justify-content-center align-items-center">
            <div className="card bg-black text-light shadow-lg p-4" style={{ width: "400px" }}>
                <h4 className="text-center text-info mb-4">
                    <i className="bi bi-shield-lock-fill"></i> CryptoChain Admin
                </h4>

                {error && (
                    <div className="alert alert-danger py-2">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control bg-dark text-light border-secondary"
                            placeholder="Enter admin username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control bg-dark text-light border-secondary"
                            placeholder="Enter password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div><hr />

                    <button className="btn btn-info w-100 fw-bold">
                        Login
                    </button>
                </form>

                <p className="text-center text-secondary small mt-3">
                    © CryptoChain Admin Panel
                </p>
            </div>
        </div>
    );
};

export default Login;
