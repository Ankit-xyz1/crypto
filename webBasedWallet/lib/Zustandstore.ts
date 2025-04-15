import { create } from "zustand";

type WalletStore = {
  walletCount: number;
  walletCreated: boolean,
  Mneomonics: string|undefined,
  wallets:any[],
  increaseWalletCount: () => void;
  toggleWallet: () => void,
  setMneomonics: (value:string) => void

}
const useWalletStore = create<WalletStore>((set, get) => ({
  walletCount: 0,
  walletCreated: false,
  Mneomonics: "",
  wallets:[],
  increaseWalletCount: () => {
    set({ walletCount: get().walletCount + 1 });
  },
  toggleWallet: () => {
    set({ walletCreated: !get().walletCreated });
  },
  setMneomonics: (value:string | undefined) => {
    set({Mneomonics:value})
  },
  setWallets: (value:any[]) => {
    set({wallets:value})
  }
}));

export default useWalletStore;
