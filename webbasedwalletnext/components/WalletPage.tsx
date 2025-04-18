import useWalletStore from "@/lib/zustandStore"
import WalletLand from "./walletPageComponents/WalletLand"
import { useEffect, useState } from "react"
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Copy, Plus, RefreshCw, Trash } from "lucide-react";
import { toast, Toaster } from "sonner";
import { Button } from "./ui/button";
import WalletCard from "./walletPageComponents/WalletCard";
import { AddWallet } from "@/lib/createWallet";


const WalletPage = () => {
  interface keyPair {
    privateKey: string | null,
    PublicKey: string | null,
  }
  const { walletCount, Mneomonics, setMneomonics, KeyPairs, setKeyPairs, toggleWallet,setdevnet,devnet } = useWalletStore()
  
  useEffect(() => {
    const mnemoics = localStorage.getItem("Mnemonics");
    if (mnemoics) {
      setMneomonics(mnemoics)
    }
  }, [])
  useEffect(() => {
    const allKeyPairs: string | null = localStorage.getItem("keyPairs")
    if (allKeyPairs) {
      const dataArr: keyPair[] = JSON.parse(allKeyPairs);
      setKeyPairs(dataArr)
    }
  }, [])


  const [refreshing, setrefreshing] = useState(false)

  const copyMnemonics = () => {
    if (Mneomonics) {
      navigator.clipboard.writeText(Mneomonics)
      toast.success("copied to clipboard")
    }
  }
  const clearWallet = () => {
    localStorage.clear()
    setMneomonics("")
    setKeyPairs([])
    toggleWallet()
  }
  const AddAnotherWallet = () => {
    if (Mneomonics) {
      const createdWallet: keyPair = AddWallet(Mneomonics, KeyPairs.length+1)
      if (createdWallet) {
        setKeyPairs([...KeyPairs, { PublicKey: createdWallet.PublicKey, privateKey: createdWallet.privateKey }])
        return toast.success("wallet created")
      }
      return toast.error("cannot create wallet")
    }
    toast.error("no mnemonics")
  }

  const refreshBalnces=()=>{
    setrefreshing(true)
    if(devnet){
      setdevnet(false)
      setTimeout(() => {
        setdevnet(true)
        setrefreshing(false)
      }, 300);
    }else{
      setdevnet(true)
      setTimeout(() => {
        setdevnet(false)
        setrefreshing(false)
      }, 300);
    }
  }
  return (
    <>
      <Toaster />
      {Mneomonics ? <>
        <Accordion type="single" collapsible className="border-[1px] p-2 rounded border-zinc-800">
          <AccordionItem value="item-1">
            <AccordionTrigger className="flex items-center cursor-pointer px-2"><h1 className="text-xl md:text-3xl ml-2 flex items-center justify-center">Secret Phrase</h1></AccordionTrigger>
            <AccordionContent>
              <motion.div className="w-full h-fit flex gap-1 flex-wrap p-2 justify-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}>
                {Mneomonics.split(" ").map((item, index) => (
                  <div key={index} className="blocks p-2 w-[70px] md:w-[200px] h-[5vh] bg-zinc-800 flex items-center justify-center rounded hover:bg-zinc-700 transition-all ease-in-out duration-300 cursor-pointer">{item}</div>
                ))}
                <div className="w-full px-2 mt-3"><button className="flex gap-2 items-center cursor-pointer text-zinc-400" onClick={copyMnemonics}>click here to copy <Copy size={15} /></button></div>
              </motion.div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <motion.div className="w-full h-[15vh] md:h-[15vh] flex justify-center flex-col md:flex-row robot"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="title md:w-[50%] h-full  flex items-center"><h1 className="text-sm md:text-2xl px-3">Your wallets</h1></div>
          <div className="btns  md:w-[50%] h-full  flex items-center justify-start md:justify-end gap-2" >
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={"default"} className="cursor-pointer bg-red-800 opacity-85 hover:bg-red-600 transition-all ease-in duration-200"><Trash />clear wallets</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-black text-white border-zinc-800">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    wallets and cannot be restored without Mnemonics
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="text-zinc-100  bg-zinc-700 outline-none border-none cursor-pointer transition-all ease-in-out duration-600">Cancel</AlertDialogCancel>
                  <AlertDialogAction className="text-red-400  bg-zinc-700 outline-none border-none cursor-pointer transition-all ease-in-out duration-600" onClick={clearWallet}><Trash />Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button onClick={AddAnotherWallet} className="cursor-pointer hover:bg-zinc-700 transition-all ease-in duration-200"><Plus />add wallet</Button>
            <Button onClick={refreshBalnces} className="cursor-pointer hover:bg-zinc-700 transition-all ease-in duration-200"><RefreshCw className={`${refreshing? "animate-spin" :""}`} />
            </Button>
          </div>
        </motion.div>
        {KeyPairs && <>
          <div className=" flex flex-col gap-2">
            {KeyPairs.map((item: keyPair, index) => (
              //a signle card for every key pairr
              <WalletCard
                key={index}
                index={index}
                publicKey={item.PublicKey || "X"}
                privateKey={item.privateKey || "X"}
              />
            ))}
          </div>
        </>}
      </>
        : <WalletLand />}
    </>
  )
}

export default WalletPage