import React from 'react'
import {motion} from 'framer-motion'

const Footer = () => {
    return (
        <motion.div className='w-full bg-zinc-950 h-[10vh] flex items-center gap-2 mt-10'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}>
            <pre>
                Devloped by <a href='https://www.linkedin.com/in/ankit-gupta-3067302b4/' target='_blank'>ankit</a>
            </pre>
            <a href="https://github.com/Ankit-xyz1" target='_blank' >
                <div className="">
                    <button className='cursor-pointer'>
                        <svg strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" className="w-8 hover:scale-125 duration-200 hover:stroke-blue-500"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    </button>
                </div>
            </a >
        </motion.div >
    )
}

export default Footer