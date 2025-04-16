'use client';
import { motion } from "framer-motion";
import { useState } from "react";
import { Copy, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface Props {
    index: number;
    publicKey: string | null;
    privateKey: string | null;
}

const WalletCard = ({ index, publicKey, privateKey }: Props) => {
    const [showPrivateKey, setShowPrivateKey] = useState(false);

    const copyToClipboard = (value: string | null, label: string) => {
        if (value) {
            navigator.clipboard.writeText(value);
            toast.success(`Copied ${label} to clipboard`);
        }
    };

    return (
        <motion.div className="rounded-xl bg-zinc-900 border-[1px] border-zinc-800 p-3 flex flex-col gap-1 overflow-hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="text-lg md:text-2xl mb-[10px] font-bold tracking-wide">Wallet {index + 1}</div>

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
        </motion.div>
    );
};

export default WalletCard;
