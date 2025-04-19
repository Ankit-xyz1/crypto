import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export const Rest = () => {
    const { publicKey, connected } = useWallet()
    const [publicky1, setpublicky1] = useState<string>()
    const [amount, setamount] = useState<number>()
    const [loader, setloader] = useState<boolean>(false)
    const { connection } = useConnection();
    useEffect(() => {
        if (publicKey?.toBase58) {
            const data = publicKey.toBase58()
            console.log("data", data)
            setpublicky1(data)
        }
    }, [connected])
    const handleAdress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setpublicky1(e.target.value)
    }
    const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        setamount(value)
    }
    const sendFaucet = async () => {
        setloader(true)
        try {
            if (publicky1 && amount) {
                const pub = new PublicKey(publicky1)
                await connection.requestAirdrop(pub, amount * LAMPORTS_PER_SOL)
                toast.success("faucet requested")
                return setloader(false)
            } else {
                toast.error("both feild are required")
                return setloader(false)
            }
        } catch (error) {
            toast.error("failed requesting it")
        }
        setloader(false)

    }
    return (
        <>
            <div className='w-full p-2 flex flex-col h-full gap-2'>
                <div className='heading h-[30%] flex flex-col gap-0.5 items-center justify-center'>
                    <h1 className='text-3xl md:text-7xl jet text-zinc-200'>Sol Faucet</h1>
                    <h2 className='text-xl md:text-3xl jet '>claim sol faucet on devnet instantly</h2>
                </div>
                <div className=' inputs h-[30%] items-center flex flex-col gap-1'>
                    <div className='flex p-2 items-start flex-col gap-2'>
                        <input value={publicky1} onChange={handleAdress} className='bg-zinc-950 w-[100%] md:w-[500px] h-[8vh] md:h-[4vh] rounded  outline-none p-2 border-2 border-zinc-900' type="text" placeholder='enter your address' />
                        <div className=' flex gap-1'>
                            <input onChange={handleAmount} value={amount} className='bg-zinc-950 no-spinner w-[50%] md:w-[200px] h-[8vh] md:h-[4vh] rounded text-white outline-none p-2 border-2 border-zinc-900' type="number" placeholder='amount' />
                            <button onClick={sendFaucet} className=' flex gap-0.5 p-2 cursor-pointer rounded bg-zinc-950 text-zinc-300  items-center'>{loader ? <><Loader size={15} className='animate-spin' /> Requesting</> : <>Request</>}</button>
                        </div>
                    </div>
                </div>
                <div className=' footer h-[30%] jet flex items-end justify-center text-white'>
                    <a href="https://github.com/Ankit-xyz1" target='_blank'>designed and developed by ankit</a></div>
            </div>
        </>
    )
}
