
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Copy, Eye, EyeOff, Send, X } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { getSoBalance, getSoBalanceOnDevnet, ReqFaucet } from "@/lib/getBalnces";
import SendingCard from "./SendingCard";
import useWalletStore from "@/lib/zustandStore";


interface Props {
    index: number;
    publicKey: string;
    privateKey: string;
}


const WalletCard = ({ index, publicKey, privateKey }: Props) => {


    const { devnet } = useWalletStore();
    const [showPrivateKey, setShowPrivateKey] = useState(false);
    const [balance, setbalance] = useState<number>(0);
    const [sending, setsending] = useState<boolean>(false)

    const copyToClipboard = (value: string | null, label: string) => {
        if (value) {
            navigator.clipboard.writeText(value);
            toast.success(`Copied ${label} to clipboard`);
        }
    };

    const getBalance = async (x: string | null) => {
        if (devnet) {
            const balanceOnDevnet: number | null = await getSoBalanceOnDevnet(x)
            console.log("balnce on devnet", balanceOnDevnet)
            if (balanceOnDevnet !== null) {
                setbalance(Math.floor(balanceOnDevnet * 10000) / 10000)
            } else {
                console.log(balanceOnDevnet)
                return toast.error("cannot fetch balance")
            }
        } else {
            const balanceOnMainnet: number | null = await getSoBalance(x);
            if (balanceOnMainnet !== null) {
                console.log("balnce on mainnet", balanceOnMainnet)
                setbalance(Math.floor(balanceOnMainnet * 10000) / 10000)
            } else {
                console.log(balanceOnMainnet)
                return toast.error("cannot fetch balance")
            }
        }

        console.log("just balance", balance)
    }

    const getfaucet = (publicKey: string | null) => {
        if (publicKey) {
            let faucetSucess = ReqFaucet(publicKey)
            faucetSucess.then((value) => {
                if (value) return toast.success("requested")
                if (!value) return toast.success("requested")
            })
        }
    }

    useEffect(() => {
        getBalance(publicKey)
    }, [])
    useEffect(() => {
        getBalance(publicKey)
    }, [devnet])
    return (
        <motion.div className="rounded-xl bg-zinc-900 border-[1px] border-zinc-800 p-3 flex flex-col gap-1 overflow-hidden relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="text-lg md:text-2xl mb-[10px] font-bold tracking-wide flex justify-between">
                Wallet {index + 1}
                <div className="px-2 text-sm text-zinc-400 flex gap-1 items-center">{balance} sol
                    <button className="flex gap-0.5 mb-1 hover:underline cursor-pointer hover:text-white transition-all ease-in-out duration-400" onClick={() => setsending(true)}><Send size={18} className="mt-1" />
                    </button>
                </div>
            </div>
            <div className=" mb-[10px]  tracking-wide flex gap-0.5 items-center font-normal justify-end text-sm md:text-lg text-zinc-300"><button className="flex gap-0.5 mb-1 hover:underline cursor-pointer hover:text-white transition-all ease-in-out duration-400 text-xs" onClick={() => { window.location.href = 'https://faucet.solana.com/' }}>Req faucet
            </button></div>

            <div className="bg-zinc-700 rounded-t-2xl rounded-xl p-1">
                {/* Public Key */}
                <div className="w-full h-fit p-2">
                    <div className="text-sm md:text-xl font-semibold">PublicKey</div>
                    <div className="text-sm md:text-lg flex gap-2">
                        <div className="w-[80%] overflow-hidden truncate py-2 text-zinc-300">
                            {publicKey}
                        </div>
                        <div className="w-[20%] flex items-center justify-end">
                            <Button className="cursor-pointer" onClick={() => copyToClipboard(publicKey, "public key")}>
                                <Copy />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="w-[80%] h-[1px] bg-zinc-800" ></div>
                {/* Private Key */}
                <div className="w-full h-fit p-2">
                    <div className="text-sm md:text-xl font-semibold">PrivateKey</div>
                    <div className="text-sm md:text-xl flex gap-2 items-center">
                        <div className="w-[80%] overflow-hidden py-2">
                            <input
                                type={showPrivateKey ? "text" : "password"}
                                className="w-full outline-none bg-transparent truncate text-zinc-300"
                                readOnly
                                value={privateKey || ""}
                            />
                        </div>
                        <div className="w-[20%] flex items-center justify-end gap-1">
                            <Button className="cursor-pointer" onClick={() => copyToClipboard(privateKey, "private key")}>
                                <Copy />
                            </Button>
                            <Button className="cursor-pointer" onClick={() => setShowPrivateKey(!showPrivateKey)}>
                                {showPrivateKey ? <EyeOff /> : <Eye />}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {sending && <>
                <motion.div className="sending absolute h-[93%] w-[94%] md:w-[98%]  rounded-lg bg-zinc-800 p-4 flex items-center justify-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }} >
                    <div className="w-full h-full">

                        <div className="x absolute top-0 right-0 p-2"><button className="cursor-pointer" onClick={() => setsending(false)}><X /></button></div>
                        <SendingCard privateKey={privateKey} solAvailabe={balance} publickey={publicKey} />
                    </div>
                </motion.div>
            </>}
        </motion.div>
    );
};

export default WalletCard;
