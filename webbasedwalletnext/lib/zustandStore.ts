import { create } from "zustand";

type WalletStore = {
  walletCount: number;
  walletCreated: boolean;
  Mneomonics: string | undefined;
  KeyPairs: any[];
  devnet: boolean;
  increaseWalletCount: () => void;
  toggleWallet: () => void;
  setMneomonics: (value: string) => void;
  setKeyPairs: (value: any[]) => void;
  setdevnet:(value:boolean)=>void
};
const useWalletStore = create<WalletStore>((set, get) => ({
  walletCount: 0,
  walletCreated: false,
  Mneomonics: "",
  devnet: true,
  KeyPairs: [],
  increaseWalletCount: () => {
    set({ walletCount: get().walletCount + 1 });
  },
  toggleWallet: () => {
    set({ walletCreated: !get().walletCreated });
  },
  setMneomonics: (value: string | undefined) => {
    set({ Mneomonics: value });
  },
  setKeyPairs: (value: any[]) => {
    //setting the nemonics
    set({ KeyPairs: value });
    //updating localstorage
    localStorage.setItem("keyPairs", JSON.stringify(get().KeyPairs));
  },
  setdevnet: (value:boolean) => {
    set({ devnet: value });
  },
}));

export default useWalletStore;
