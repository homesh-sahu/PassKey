import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 flex justify-between p-2 text-white items-center'>
        <div className="logo mx-6"><a href="#" className='font-bold md:text-xl'>
          <span className='text-green-500'> &lt;</span>
          Pass
          <span className='text-green-500'>Key/&gt;</span></a></div>
        <ul className='flex gap-4 mx-8'>
            {/* <li className='hover:font-bold p-1'><a href="#">Home</a></li>
            <li className='hover:font-bold p-1'><a href="#">About</a></li>
            <li className='hover:font-bold p-1'><a href="#">Contact</a></li>
            <li className='hover:font-bold p-1'><a href="#">Help</a></li> */}
            <a className='flex items-center gap-3 border border-white rounded-full px-3 py-0.5 text-xs md:text-sm font-bold hover:shadow-white shadow' href='https://github.com/homesh-sahu/PassKey' target='_blank'>
              <p>Source Code</p>
            <img src="Github.png" alt="github" className='invert w-8 rounded-full cursor-pointer'/>
            </a>
        </ul>
    </nav>
  )
}

export default Navbar