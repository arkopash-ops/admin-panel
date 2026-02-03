import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside className="col-2 bg-black text-light sticky-top vh-100 p-3">
            <h5 className="text-info fw-bold mb-4">CryptoChain</h5>

            <ul className="nav flex-column gap-2">
                <NavLink to="/" className="nav-link text-light">
                    <i className="bi bi-window-desktop"></i> Dashboard
                </NavLink>
                <NavLink to="/users" className="nav-link text-light">
                    <i className="bi bi-person-fill"></i> Users
                </NavLink>
                <NavLink to="/kyc" className="nav-link text-light">
                    <i className="bi bi-person-fill-check"></i> KYC
                </NavLink>
                <NavLink to="/transactions" className="nav-link text-light">
                    <i className="bi bi-currency-bitcoin"></i> Transaction
                </NavLink>
                <NavLink to="/wallets" className="nav-link text-light">
                    <i className="bi bi-wallet2"></i> Wallets
                </NavLink>
            </ul>
        </aside>
    );
};

export default Sidebar;
