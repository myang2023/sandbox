import UserInput from "./UserInput"
import LoadData from "@/components/enter/LoadData"

export default function EnterPanel() {

    return <div className="border-2 p-3 border-medium bg-light drop-shadow-lg rounded-lg">
        <UserInput />
        <LoadData />
    </div>
}