import { Routes, Route } from "react-router-dom";
import AdminLayout from "../pages/AdminLayout";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Transaction from "../pages/Transaction";
import Wallets from "../pages/Wallets";
import Login from "../pages/Login";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/transactions" element={<Transaction />} />
            <Route path="/wallets" element={<Wallets />} />
        </Route>
    </Routes>
);

export default AppRoutes;
