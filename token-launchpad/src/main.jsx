import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
    <App />
    
    </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
)
