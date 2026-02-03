const walletStore = new Map<number, string>();

export const getWalletAddress = (userId: number): string => {
  if (!walletStore.has(userId)) {
    walletStore.set(
      userId,
      `0x${crypto.randomUUID()}`
    );
  }
  return walletStore.get(userId)!;
};
