'use client';

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
    <div className="rounded-xl bg-zinc-900 border-[1px] border-zinc-800 p-2 flex flex-col gap-1 overflow-hidden">
      <div className="text-lg md:text-2xl">Wallet {index + 1}</div>

      <div className="bg-zinc-700 rounded-t-2xl rounded-xl p-1">
        {/* Public Key */}
        <div className="w-full h-fit p-2">
          <div className="text-sm md:text-xl">publicKey</div>
          <div className="text-sm md:text-xl flex gap-2">
            <div className="w-[80%] overflow-hidden truncate py-2">
              {publicKey}
            </div>
            <div className="w-[20%] flex items-center justify-end">
              <Button onClick={() => copyToClipboard(publicKey, "public key")}>
                <Copy />
              </Button>
            </div>
          </div>
        </div>

        {/* Private Key */}
        <div className="w-full h-fit p-2">
          <div className="text-sm md:text-xl">privateKey</div>
          <div className="text-sm md:text-xl flex gap-2 items-center">
            <div className="w-[80%] overflow-hidden py-2">
              <input
                type={showPrivateKey ? "text" : "password"}
                className="w-full outline-none bg-transparent truncate"
                readOnly
                value={privateKey || ""}
              />
            </div>
            <div className="w-[20%] flex items-center justify-end gap-1">
              <Button onClick={() => copyToClipboard(privateKey, "private key")}>
                <Copy />
              </Button>
              <Button onClick={() => setShowPrivateKey(!showPrivateKey)}>
                {showPrivateKey ? <EyeOff /> : <Eye />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
