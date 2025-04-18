"use client"
import { Loader, Send } from 'lucide-react';
import React, { useState } from 'react'
import { Button } from '../ui/button';
import useWalletStore from '@/lib/zustandStore';
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from '@solana/web3.js';
import { toast, Toaster } from 'sonner';
import bs58 from "bs58";
import { getSoBalanceOnDevnet } from '@/lib/getBalnces';


interface Props {
    privateKey: string
    solAvailabe: number
    publickey: string | null;
}

const SendingCard = ({ privateKey, solAvailabe, publickey }: Props) => {
    const { devnet } = useWalletStore();
    const [loading, setloading] = useState<boolean>(false)
    const [amount, setamount] = useState<number>(0);
    const [sendToAddress, setsendToAddress] = useState<string>('')

    const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        setamount(value)
    }
    const handleAdress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setsendToAddress(e.target.value)
    }

    const sendTransaction = async () => {
        if (amount > solAvailabe) return toast.error("less solana in balance")
        setloading(true)
        //if devnet is true we send transaction on devnet
        if (devnet) {
            try {
                const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
                if (publickey) {
                    const from = new PublicKey(publickey)
                    const to = new PublicKey(sendToAddress)
                    const transaction = new Transaction().add(
                        SystemProgram.transfer({
                            fromPubkey: from,
                            toPubkey: to,
                            lamports: amount * LAMPORTS_PER_SOL,
                        })
                    )
                    const base58PrivateKey = privateKey;
                    const secretKey = bs58.decode(base58PrivateKey);
                    const signer = Keypair.fromSecretKey(secretKey);
                    const signature = await sendAndConfirmTransaction(connection, transaction, [signer]);
                    toast.success("transaction sended")
                }
            } catch (error) {
                console.log(error)
                toast.error("error sedning the transaction")
            }

        }
        //if devent is false we send transaction on mainnet
        if (!devnet) {
            const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
            try {
                if (publickey) {
                    const from = new PublicKey(publickey)
                    const to = new PublicKey(sendToAddress)
                    const transaction = new Transaction().add(
                        SystemProgram.transfer({
                            fromPubkey: from,
                            toPubkey: to,
                            lamports: amount * LAMPORTS_PER_SOL,
                        })
                    )
                    const base58PrivateKey = privateKey;
                    const secretKey = bs58.decode(base58PrivateKey);
                    const signer = Keypair.fromSecretKey(secretKey);
                    const signature = await sendAndConfirmTransaction(connection, transaction, [signer]);
                    toast.success("transaction sended")
                }
            } catch (error) {
                console.log(error)
                toast.error("error sedning the transaction")
            }

        }
        setloading(false)
    }
    return (
        <div className='h-full w-full flex flex-col gap-1'>
            <Toaster />
            <h2 className='md:text-2xl text-xl font-semibold tracking-wide robot text-white mb-5'>Send your sol</h2>
            <div className='w-[80%] flex gap-1 flex-col'>
                <div className='flex gap-1'>
                    <input value={amount} onChange={handleAmount} className='no-spinner w-[30%] p-2 bg-zinc-900 rounded-lg outline-none' type="number" placeholder='enter amount' />
                    <button className='underline cursor-pointer text-zinc-400 ' onClick={() => setamount(solAvailabe || 0)}>max.</button>
                </div>
                <input value={sendToAddress} onChange={handleAdress} className='w-full p-2 bg-zinc-900 rounded-lg outline-none' type="text" placeholder='enter adress where to send' />
            </div>
            <div>
                <Button onClick={sendTransaction} className='flex gap-2 cursor-pointer '>{loading ? <><Loader className='animate-spin' />sending</> : <>Send<Send /></>}  </Button>
            </div>
            <div className='h-full w-full flex items-center'><span className='bg-zinc-800 p-1 rounded text-sm md:text-lg'>Note:</span> <span className='text-zinc-300 md:text-lg ml-2 text-xs'>sending your sol is an irreversibe process check the address carefully</span></div>
        </div>
    )
}

export default SendingCard