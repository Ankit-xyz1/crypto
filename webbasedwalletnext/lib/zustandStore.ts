import { create } from "zustand";

type WalletStore = {
  walletCount: number;
  walletCreated: boolean,
  Mneomonics: string|undefined,
  KeyPairs:any[],
  increaseWalletCount: () => void;
  toggleWallet: () => void,
  setMneomonics: (value:string) => void,
  setKeyPairs: (value:any[]) => void

}
const useWalletStore = create<WalletStore>((set, get) => ({
  walletCount: 0,
  walletCreated: false,
  Mneomonics: "",
  KeyPairs:[],
  increaseWalletCount: () => {
    set({ walletCount: get().walletCount + 1 });
  },
  toggleWallet: () => {
    set({ walletCreated: !get().walletCreated });
  },
  setMneomonics: (value:string | undefined) => {
    set({Mneomonics:value})
  },
  setKeyPairs: (value:any[]) => {
    //setting the nemonics
    set({KeyPairs:value})
    //updating localstorage
    localStorage.setItem("keyPairs",JSON.stringify(get().KeyPairs))
  }
}));

export default useWalletStore;
