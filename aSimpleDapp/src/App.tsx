import  {  useMemo } from 'react';
import { ConnectionProvider, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  WalletModalProvider,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css'

import './App.css'
import { ToastContainer } from 'react-toastify';
import { Rest } from './components/Rest';

function App() {
  const { publicKey } = useWallet()
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  
  return (
    <ConnectionProvider endpoint={endpoint} >
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <ToastContainer />
          <div className='h-fit flex items-center justify-center bg-[#03001C]'>
            <div className='h-screen w-full md:w-[50%] bg-[#03001C] flex  text-[#B6EADA] flex-col '>
              <div className='h-[10vh] w-full p-3 flex justify-between items-center'>
                <div className="title"><h1 className='text-xl jet'>AIRDROPX</h1></div>
                <div className="title jet">
                  <><WalletMultiButton className='transition-all ease-in-out duration-300'>{publicKey?.toBase58()}</WalletMultiButton></>
                </div>
              </div>
              <Rest/>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider >
    </ConnectionProvider >
  )
}

export default App
