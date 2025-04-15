
import './App.css'
import Landing from './components/Landing'
import Navbar from './components/Navbar'
import useWalletStore from '../lib/Zustandstore'
import WalletPage from './components/WalletPage'
function App() {
  const {walletCreated} = useWalletStore()
  return (
    <>
      <div className="main h-screen w-full flex  items-center justify-center text-white bg-zinc-950 overflow-auto ">
        <div className='w-full md:w-[50%]  min-h-screen overflow-auto px-5'>
          <Navbar/>
          {walletCreated?<><WalletPage/></>:<><Landing/></>}
          
        </div>
      </div>
    </>
  )
}

export default App
