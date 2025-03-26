export default function DownloadComment({ data }) {
    const handleDownload = () => {

        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "comment.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return <div className="w-full flex justify-center">
        <button onClick={handleDownload} className="px-2 rounded border-2 border-indigo-500 hover:bg-indigo-200">
            Download
        </button>
    </div>


}
