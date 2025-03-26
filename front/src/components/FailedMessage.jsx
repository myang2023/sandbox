


export default function FailedMessage({ message }) {


    return <div className="flex flex-col justify-center items-center py-3">
        <p className="bg-red-700 text-white rounded px-3 py-1 w-fit" >
            {message}
        </p>
    </div>

}