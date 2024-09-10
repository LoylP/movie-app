"use client"

export default function error({ reset }: { reset: () => void }) {

    return(
        <div className="text-center mt-10">
            <h1>Something went wrong, Please try again !</h1>
            <button className="hover:text-amber-400" onClick={() => reset()}>Try again!</button>
        </div>
    )
}