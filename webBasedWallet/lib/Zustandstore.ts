import { create } from "zustand";

type WalletStore = {
  walletCount: number;
  walletCreated:boolean
  increaseWalletCount: () => void;
  toggleWallet:()=>void
}
const useWalletStore = create<WalletStore>((set, get) => ({
  walletCount: 0,
  walletCreated:false,
  increaseWalletCount: () => {
    set({ walletCount: get().walletCount + 1 });
  },
  toggleWallet: () => {
    set({ walletCreated: !get().walletCreated });
  },
}));

export default useWalletStore;
