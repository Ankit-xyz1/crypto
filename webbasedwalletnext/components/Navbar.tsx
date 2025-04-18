"use client"
import { Bitcoin, Check, ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import useWalletStore from '@/lib/zustandStore'


const Navbar = () => {
  const { devnet, setdevnet } = useWalletStore();
  const [showDrawer, setshowDrawer] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setshowDrawer(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const setNetwork = (x: number) => {
    setshowDrawer(false)
    if (x == 1) {
      setdevnet(false)
    }
    if (x == 2) {
      setdevnet(true)
    }
  }
  return (
    <nav className="w-full h-[10vh] bg-transparent p-[1px] flex relative">
      <div className="logo w-[50%] flex gap-0.5 text-xl md:text-3xl items-center justify-start font-semibold text-zinc-300"><Bitcoin strokeWidth={2.5} size={34} />ANBIT</div>
      <div className="logo w-[50%] flex gap-0.5 text-xs md:text-xl items-center justify-end font-semibold text-zinc-300" ><Button className='' onClick={() => setshowDrawer(showDrawer ? false : true)}>Network : {devnet ? "devnet" : "mainnet"} <ChevronDown className={`${showDrawer ? "rotate-180" : "rotate-0"} transition-all ease-in-out duration-300`} /></Button></div>
      {showDrawer && <>
        <motion.div ref={drawerRef} className="drawer bg-zinc-900 w-[100px] md:w-[100px] h-[100px] md:h-[100px] z-10 absolute right-[0px] top-18 flex items-center justify-center flex-col gap-1 p-2 rounded-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}>
          <Button onClick={() => setNetwork(1)} className='w-[90px] cursor-pointer flex justify-start'>mainnet {!devnet && <Check />}</Button>
          <Button onClick={() => setNetwork(2)} className='w-[90px] cursor-pointer'>devnet{devnet && <Check />}</Button>
        </motion.div>
      </>}
    </nav>
  )
}

export default Navbar