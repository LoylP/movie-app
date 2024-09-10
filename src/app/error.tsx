"use client"

import { useEffect } from "react"

export default function error({ error, reset }: { error: Error; reset: () => void }) {
    
    useEffect(() => {
        console.log(error);
    }, [error])

    return(
        <div className="text-center mt-10">
            <h1>Something went wrong, Please try again !</h1>
            <button className="hover:text-amber-400" onClick={() => reset()}>Try again!</button>
        </div>
    )
}