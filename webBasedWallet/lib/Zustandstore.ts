import { create } from 'zustand';

type WalletStore = {
    walletCount: number;
    increaseWalletCount: () => void;
};
const useWalletStore = create<WalletStore>((set, get) => ({
    walletCount: 0,
    increaseWalletCount: () => {
        set({ walletCount: get().walletCount + 1 });
    },
}));

export default useWalletStore;
