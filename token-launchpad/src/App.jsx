import { useState } from "react";
import {
  createInitializeMint2Instruction,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import "./App.css";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey } from "@solana/web3.js";
import { SystemProgram } from "@solana/web3.js";
import { Transaction } from "@solana/web3.js";
import { Keypair } from "@solana/web3.js";
import { useEffect } from "react";

function App() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [name, setname] = useState("");
  const [ticker, setticker] = useState("");
  const [image, setimage] = useState("");
  const [supply, setsupply] = useState("");
  const [pk, setpk] = useState('xx')

  const handleName = (e) => {
    setname(e.target.value);
  };
  const handleTicker = (e) => {
    setticker(e.target.value);
  };
  const handleimage = (e) => {
    setimage(e.target.value);
  };
  const handleSupply = (e) => {
    setsupply(e.target.value);
  };
  const { connected, publicKey } = useWallet();
  useEffect(() => {
    if(connected){
      setpk(publicKey.toString())
    } 
  }, [])
  

  const createToken = async () => {
    const keypair = Keypair.generate();
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const programId = TOKEN_PROGRAM_ID;
    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: keypair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId,
      }),
      createInitializeMint2Instruction(
        keypair.publicKey,
        9,
        wallet.publicKey,
        wallet.publicKey,
        programId
      )
    );
    const recentBlockHash = await connection.getLatestBlockhash()
    transaction.recentBlockhash = recentBlockHash.blockhash
    transaction.feePayer = wallet.publicKey
    transaction.partialSign(keypair)
    const res = await wallet.sendTransaction(transaction , connection)
    console.log(res)
    //await sendAndConfirmTransaction(connection, transaction, [payer, keypair]);
  };

  return (
    <div className="bg-[#3D365C] w-full h-screen flex justify-center">
      <div className="w-full md:w-[50%] flex h-full items-center justify-center gap-2 flex-col">
        <WalletMultiButton>
          {connected ? <>{pk.slice(0,5)+"....."}</> : "connect"}
        </WalletMultiButton>
        <h1 className="text-2xl text-white">Create your own token</h1>
        <input
          type="text"
          placeholder="Name of your token"
          className="border-2 border-zinc-900 bg-zinc-950 rounded text-white h-[50px] p-2 outline-none"
          onChange={handleName}
          value={name}
        />
        <input
          type="text"
          placeholder="ticker of your token"
          className="border-2 border-zinc-900 bg-zinc-950 rounded text-white h-[50px] p-2 outline-none"
          onChange={handleTicker}
          value={ticker}
        />
        <input
          type="text"
          placeholder="image of your token"
          className="border-2 border-zinc-900 bg-zinc-950 rounded text-white h-[50px] p-2 outline-none"
          onChange={handleimage}
          value={image}
        />
        <input
          type="text"
          placeholder="supply of your token"
          className="border-2 border-zinc-900 bg-zinc-950 rounded text-white h-[50px] p-2 outline-none"
          onChange={handleSupply}
          value={supply}
        />
        <button
          onClick={() => createToken()}
          className="border-2 cursor-pointer border-zinc-900 bg-zinc-950 rounded text-white h-[50px] p-2 outline-none"
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default App;
