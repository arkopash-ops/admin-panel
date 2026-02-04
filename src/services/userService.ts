import type { User } from "../types/User";
import type { ApiUser } from "../types/ApiUser";
import { getWalletAddress } from "../utils/wallet";

interface DummyUserResponse {
  users: ApiUser[];
}

const kycStatuses = ["Pending", "Approved", "Rejected"] as const;

export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("https://dummyjson.com/users");
  if (!res.ok) throw new Error("Failed to fetch users");

  const data: DummyUserResponse = await res.json();

  return data.users.map((u) => ({
    id: u.id,
    image: u.image,
    firstName: u.firstName,
    lastName: u.lastName,
    email: u.email,
    phone: u.phone,
    walletAddress: getWalletAddress(u.id),
    kycStatus: kycStatuses[u.id % 3],
    accountStatus: u.id % 2 === 0 ? "Active" : "Blocked",
  }));
};
