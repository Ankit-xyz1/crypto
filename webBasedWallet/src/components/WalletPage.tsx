import useWalletStore from "../../lib/Zustandstore"
import MainWalletPage from "./walletPageComponents/MainWalletPage"
import WalletLand from "./walletPageComponents/WalletLand"
const WalletPage = () => {
  const { walletCount,Mneomonics } = useWalletStore()
  return (
    <>
    {Mneomonics?<MainWalletPage/>:<WalletLand />}
    </>
  )
}

export default WalletPage