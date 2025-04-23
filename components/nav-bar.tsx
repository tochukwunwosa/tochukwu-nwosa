import React from 'react'
import { Menu } from 'lucide-react'
import ModeToggle from './theme/theme-toggle'

export default function NavBar() {
  return (
    <nav className='fixed top-5  flex items-center w-full z-50'>
      <div className="relative ml-5 bg-foreground text-background dark:bg-background dark:text-foreground rounded-full shadow-lg dark:shadow-sm shadow-foreground grid place-items-center">
        <ModeToggle />
      </div>
      <button className='ml-auto mr-5 cursor-pointer size-12 grid place-items-center bg-foreground text-background dark:bg-background dark:text-foreground rounded-full p-2 shadow-lg dark:shadow-sm shadow-foreground'>
        <Menu />
      </button>
    </nav>
  )
}