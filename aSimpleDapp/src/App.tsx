import React, { useEffect, useMemo, useState } from 'react';
import { ConnectionProvider, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css'

import './App.css'
import Navbar from './components/navbar';
import { ToastContainer } from 'react-toastify';
import { Rest } from './components/Rest';

function App() {
  const { publicKey, connected } = useWallet()
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const [publicky1, setpublicky1] = useState<string>()

  useEffect(() => {
    if(publicKey?.toBase58){
      const data = publicKey.toBase58()
      console.log("data",data)
      setpublicky1(data)
    }
  }, [connected])
  
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
