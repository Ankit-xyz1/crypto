"use client"
import { Loader, Send } from 'lucide-react';
import React, { useState } from 'react'
import { Button } from '../ui/button';

interface Props {
    privateKey: string | null;
    solAvailabe : number | null;
}

const SendingCard = ({ privateKey,solAvailabe }: Props) => {
    const [loading, setloading] = useState<boolean>(false)
    const [amount, setamount] = useState<string>();
    const [sendToAddress, setsendToAddress] = useState<string>('')

    const handleAmount = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setamount(e.target.value)
    }
    const handleAdress = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setsendToAddress(e.target.value)
    }
    return (
        <div className='h-full w-full flex flex-col gap-1'>
            <h2 className='md:text-2xl text-xl font-semibold tracking-wide robot text-white mb-5'>Send your sol</h2>
            <div className='w-[80%] flex gap-1 flex-col'>
                <div className='flex gap-1'>
                    <input value={amount} onChange={handleAmount} className='w-[30%] p-2 bg-zinc-900 rounded-lg outline-none' type="text" placeholder='enter amount' />
                    <button className='underline cursor-pointer text-zinc-400 ' onClick={()=>setamount(solAvailabe?.toString())}>max.</button>
                </div>
                <input value={sendToAddress} onChange={handleAdress} className='w-full p-2 bg-zinc-900 rounded-lg outline-none' type="text" placeholder='enter adress where to send' />
            </div>
            <div>
                <Button className='flex gap-2 cursor-pointer '>{loading ? <><Loader className='animate-spin' />sending</> : <>Send<Send /></>}  </Button>
            </div>
            <div className='h-full w-full flex items-center'><span className='bg-zinc-800 p-1 rounded text-sm md:text-lg'>Note:</span> <span className='text-zinc-300 md:text-lg ml-2 text-xs'>sending your sol is an irreversibe process check the address carefully</span></div>
        </div>
    )
}

export default SendingCard