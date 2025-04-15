"use client"
import Landing from "@/components/Landing";
import Navbar from "@/components/Navbar";
import WalletPage from "@/components/WalletPage";
import useWalletStore from '@/lib/zustandStore'
import { useEffect } from "react";
export default function Home() {
  const {walletCreated} = useWalletStore()
  return (
    <>
      <>
        <div className="main h-screen w-full flex  items-center justify-center text-white bg-zinc-950 overflow-auto ">
          <div className='w-full md:w-[50%]  min-h-screen overflow-auto px-5'>
            <Navbar />
            {walletCreated ? <><WalletPage /></> : <><Landing /></>}

          </div>
        </div>
      </>
      )
    </>
  );
}
