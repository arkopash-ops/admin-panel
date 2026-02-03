import { useEffect, useState } from "react";
import type { User } from "../types/user";
import { fetchUsers } from "../services/userService";

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers()
            .then(setUsers)
            .finally(() => setLoading(false));
    }, []);

    return { users, setUsers, loading };
};
