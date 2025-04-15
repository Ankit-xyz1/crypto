import useWalletStore from "@/lib/zustandStore"
import WalletLand from "./walletPageComponents/WalletLand"
import { useEffect, useState } from "react"
import { div } from "motion/react-client"


const WalletPage = () => {
  interface keyPair {
    privateKey: string | null,
    PublicKey: string | null,
  }
  const { walletCount, Mneomonics, setMneomonics,KeyPairs , setKeyPairs } = useWalletStore()
  const [keyPairsArr, setkeyPairsArr] = useState(1)
  useEffect(() => {
    const mnemoics = localStorage.getItem("Mnemonics");
    if (mnemoics) {
      setMneomonics(mnemoics)
    }
  }, [])
  useEffect(() => {
    const allKeyPairs: string | null = localStorage.getItem("keyPairs")
    if (allKeyPairs) {
      const dataArr: keyPair[] = JSON.parse(allKeyPairs);
      setKeyPairs(dataArr)
      setkeyPairsArr(keyPairsArr+1)
    }
  }, [])

  return (
    <>
      {Mneomonics ? <>
        <div>{keyPairsArr}{Mneomonics}</div>
        {KeyPairs && <>
          {KeyPairs.map((item: keyPair, index) => (
            <div key={index}>
              publicKey {item.PublicKey}
              <br />
              privateKey {item.privateKey}
            </div>
          ))}
        </>}
      </>
        : <WalletLand />}
    </>
  )
}

export default WalletPage