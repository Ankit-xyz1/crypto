import useWalletStore from "../../lib/Zustandstore"
import { Button } from "./ui/button"
import { motion } from "framer-motion";


const Landing = () => {
    const { toggleWallet } = useWalletStore()
    return (
        <>
            <motion.div className='w-full h-full rob flex flex-col gap-4 mt-10'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}>
                <h1 className="text-xl md:text-5xl text-zinc-300">Select a blockchain to create a wallet</h1>
                <div className="btns flex-row flex gap-4">
                    <Button variant={"outline"} className="cursor-pointer text-zinc-950 font-semibold w-[100px] hover:bg-zinc-300 transition-all ease-in-out duration-300" onClick={toggleWallet}>Solana</Button>
                    <Button variant={"outline"} className="cursor-pointer text-zinc-950 font-semibold w-[100px] hover:bg-zinc-300 transition-all ease-in-out duration-300 " disabled >Etherum</Button>
                </div>
            </motion.div>
        </>
    )
}

export default Landing