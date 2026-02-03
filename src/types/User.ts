export interface User {
    id: number;
    image?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    walletAddress: string;
    kycStatus: "Pending" | "Approved" | "Rejected";
    accountStatus: "Active" | "Blocked";
}
