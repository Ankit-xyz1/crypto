import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { ChevronLeft } from "lucide-react"
import { useState } from "react"
import { Toaster } from "../ui/sonner"
import { toast } from "sonner"
import { AddWallet, createWallet } from "../../../lib/createWallet"
import useWalletStore from "../../../lib/Zustandstore"

const WalletLand = () => {
    interface walletType {
        mnemonic?: string,
        privateKey: string | null,
        PublicKey: string | null,
    }
    const { walletCount, setMneomonics } = useWalletStore()
    const [stwallet, setstwallet] = useState<any[]>([])
    const [textAreaValue, settextAreaValue] = useState<string>()
    const handletextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        settextAreaValue(e.target.value)
    }

    const CreateWallet = () => {
        if (textAreaValue) {
            const phrase: string[] = textAreaValue.split(" ")
            if (phrase.length !== 12 && phrase.length !== 24) return toast.error("invalid phrase seed.");
            setMneomonics(textAreaValue)
            const wallet: walletType = AddWallet(textAreaValue, walletCount)
            if (!wallet.privateKey) return toast.error("phrase is invalid")
            setstwallet([wallet])
        } else {
            const created_wallet: walletType = createWallet()
            if (!created_wallet.privateKey) return toast.error("error occured")
            setMneomonics(created_wallet.mnemonic || "")

            const New_wallet: walletType = {
                PublicKey: created_wallet.PublicKey,
                privateKey: created_wallet.privateKey
            }
            setstwallet([New_wallet])
            console.log("else is running");
        }
    }
    return (
        <motion.div className="w-full h-[40vh] flex flex-col gap-4 items-center justify-center relative"
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
            <button className="exit w-fit h-fit absolute bottom-[-50px] left-[8px] z-10 bg-zinc-800 rounded p-1 flex items-center justify-center hover:bg-zinc-700 transition-all ease-in-out duration-500 cursor-pointer">
                <ChevronLeft className="" />
            </button>
        </motion.div>
    )
}

export default WalletLand