"use client"
import Footer from "@/components/Footer";
import Landing from "@/components/Landing";
import Navbar from "@/components/Navbar";
import WalletPage from "@/components/WalletPage";
import useWalletStore from '@/lib/zustandStore'
export default function Home() {
  const { walletCreated } = useWalletStore()
  return (
    <>

      <div className="main min-h-[80vh] w-full flex flex-col  items-center justify-center text-white bg-zinc-950 overflow-auto ">
        <div className='w-full md:w-[50%]  min-h-screen overflow-auto px-5'>
          <Navbar />
          {walletCreated ? <><WalletPage /></> : <><Landing /></>}
          <Footer />
        </div>
      </div>

    </>
  );
}
