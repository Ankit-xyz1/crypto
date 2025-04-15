import {Bitcoin} from 'lucide-react'


const Navbar = () => {
  return (
    <nav className="w-full h-[10vh] bg-transparent p-[1px] flex ">
      <div className="logo w-full flex gap-0.5 text-xl md:text-3xl items-center justify-start font-semibold text-zinc-300"><Bitcoin strokeWidth={2.5} size={34}/>ANBIT</div>
    </nav>
  )
}

export default Navbar