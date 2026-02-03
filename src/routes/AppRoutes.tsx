import { Routes, Route } from "react-router-dom";
import AdminLayout from "../pages/AdminLayout";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import KYC from "../pages/KYC";
import Transaction from "../pages/Transaction";
import Wallets from "../pages/Wallets";

const AppRoutes = () => (
    <Routes>
        <Route element={<AdminLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/kyc" element={<KYC />} />
            <Route path="/transactions" element={<Transaction />} />
            <Route path="/wallets" element={<Wallets />} />
        </Route>
    </Routes>
);

export default AppRoutes;
