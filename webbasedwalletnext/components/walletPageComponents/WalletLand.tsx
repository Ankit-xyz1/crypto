"use client"
import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { ChevronLeft } from "lucide-react"
import { useState } from "react"
import { Toaster } from "../ui/sonner"
import { toast } from "sonner"
import useWalletStore from "@/lib/zustandStore"
import { AddWallet, createWallet } from "@/lib/createWallet"
import { PublicKey } from "@solana/web3.js"
const WalletLand = () => {
    interface walletType {
        mnemonic?: string,
        privateKey: string | null,
        PublicKey: string | null,
    }
    //global states
    const { walletCount, setMneomonics, setKeyPairs, KeyPairs,toggleWallet } = useWalletStore()
    //local states
    const [textAreaValue, settextAreaValue] = useState<string>()

    //text area handling function
    const handletextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        settextAreaValue(e.target.value)
    }

    //creating a wallet
    const CreateWallet = () => {
        //if user want to recover an wallet
        if (textAreaValue) {
            //validating it
            const phrase: string[] = textAreaValue.split(" ")
            if (phrase.length !== 12 && phrase.length !== 24) return toast.error("invalid phrase seed.");
            //updating global state
            setMneomonics(textAreaValue)
            //calling the function that creates the wallet
            const walletFromFunc: walletType = AddWallet(textAreaValue, walletCount)
            //handling the error
            if (!walletFromFunc.privateKey) {
                return toast.error("phrase is invalid")
            }
            //if suceed save this to local storage
            localStorage.setItem("Mnemonics", textAreaValue.toString())
            const keyPair: walletType = {
                privateKey: walletFromFunc.privateKey,
                PublicKey: walletFromFunc.PublicKey
            }
            setKeyPairs([...KeyPairs, keyPair])
            //
        } else {
            //if user wants to genrate a new wallet
            const created_wallet: walletType = createWallet()
            //handling the error
            if (!created_wallet.privateKey) {
                return toast.error("error occured")
            }
            //if sucessfull 
            if (created_wallet.mnemonic) {
                //updating global state mnemonics
                setMneomonics(created_wallet.mnemonic)
                //saving to local storeage 
                localStorage.setItem("Mnemonics", created_wallet.mnemonic.toString())
            }
            //the mnemonics key pair (default/first : 1)
            const keyPair: walletType = {
                PublicKey: created_wallet.PublicKey,
                privateKey: created_wallet.privateKey
            }
            setKeyPairs([...KeyPairs, keyPair])
        }
    }

    const Goback = ()=>{
        toggleWallet()
    }
    return (
        <motion.div className="w-full h-[40vh] flex flex-col gap-4 items-start justify-center relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}>
            <Toaster theme="dark" />
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-0.5 robot">
                    <h1 className="text-xl md:text-4xl font-bold">Recovery phase</h1>
                    <h2 className="text-zinc-400">Enter a recovery phrase to recover your wallet</h2>
                </div>
                <div className="inputbtn w-full flex flex-wrap gap-2  md:gap-20">
                    <textarea onChange={handletextarea} value={textAreaValue} name="" id="" placeholder="left empty to create a new wallet" className="text-zinc-200 w-[90%] md:w-[500px] md:h-[130px] h-[200px] resize-none rounded border-zinc-500 border-2 p-2 outline-none"></textarea>
                    <Button variant={"outline"} className="cursor-pointer text-zinc-950 font-semibold w-[130px] hover:bg-zinc-300 transition-all ease-in-out duration-300"
                        onClick={CreateWallet}>{textAreaValue ? "Recover wallet" : "Genrate Wallet"}</Button>
                </div>
            </div>
            <button onClick={Goback} className="exit w-fit h-fit absolute bottom-[-50px] left-[8px] z-10 bg-zinc-800 rounded p-1 flex items-center justify-center hover:bg-zinc-700 transition-all ease-in-out duration-500 cursor-pointer">
                <ChevronLeft className="" />
            </button>
        </motion.div>
    )
}

export default WalletLand