
import './App.css'

function App() {

  return (
    <>
      <div className="main h-screen w-full flex flex-col  text-white bg-zinc-950 p-2 overflow-auto">
        <div className="create h-[20vh] bg-blue-600 w-full flex mt-10 ">
          <div className='flex justify-center  flex-col p-5 items-start w-[50%] bg-red-500'>
            <h1 className='text-3xl md:text-xl'>ANKY WALLET</h1>
            <h2>Create SOL Wallet at instants</h2>
          </div>
          <div className="CreateButton"></div>
        </div>
      </div>
    </>
  )
}

export default App
