

export default function InitializeWait({ message }) {
    return <div className="flex flex-col justify-center items-center py-3">

        <button className="bg-sky-700 hover:bg-sky-800 text-white rounded border px-3 py-1 w-fit flex gap-3" >
            <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-light border-t-transparent rounded-full animate-spin">

                </div>
            </div>
            {message}

        </button>
    </div>


}