"use client"
import { ThemeProvider } from "next-themes"
import { ReactNode } from "react"

export default function Providers({children} : {children: ReactNode}) {
    return(
        <ThemeProvider defaultTheme="system" attribute="class">
            <div className='text-gray-700 dark:text-gray-200 dark:bg-slate-900 min-h-screen select-none transition-colors duration-300'>
                {children}
            </div>
        </ThemeProvider>
    )
}