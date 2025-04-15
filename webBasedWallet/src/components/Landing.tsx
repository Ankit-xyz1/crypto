import useWalletStore from "../../lib/Zustandstore"
import { Button } from "./ui/button"

const Landing = () => {
    const {toggleWallet} =  useWalletStore()
    return (
        <>
            <div className='w-full h-full rob flex flex-col gap-4'>
                <h1 className="text-xl md:text-5xl text-zinc-300">Select a blockchain to create a wallet</h1>
                <div className="btns flex-row flex gap-4">
                    <Button variant={"outline"} className="cursor-pointer text-zinc-950 font-semibold w-[100px] hover:bg-zinc-300 transition-all ease-in-out duration-300" onClick={toggleWallet}>Solana</Button>
                    <Button variant={"outline"} className="cursor-pointer text-zinc-950 font-semibold w-[100px] hover:bg-zinc-300 transition-all ease-in-out duration-300 " disabled >Etherum</Button>
                </div>
            </div>
        </>
    )
}

export default Landing