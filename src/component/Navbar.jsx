import React from 'react'
function Navbar() {
  return (
    <nav className='bg-blue-900 flex justify-between items-center px-4 h-14'>
        <div className='logo font-bold text-white'> PassWord Manager</div>

            <div className='left-0'>

                <div className=" px-2 h-10  w-32 py-2 bg-blue-200 border rounded-full text-black flex justify-center items-center font-bold" ><a className="flex justify-center items-center font-bold" href='https://github.com/Sudhanshu012588' target='_blank'>
                  <img className='h-8 mx-3 ' src="../public/social.png" alt="GitHub" />
                        GitHub
                </a>
                </div>
            </div>
            
    </nav>
  )
}

export default Navbar
