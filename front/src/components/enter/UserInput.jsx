'use client'
import { useAppContext } from "@/components/ContextProvider";
import { useState } from "react";
import { AvatarList } from "../AvatarList";

const n = 9;
const idList = [...Array(n).keys()];

export default function UserInput() {
    const { user, setUser } = useAppContext();

    const [username, setUsername] = useState(user.name);
    const [avatar, setAvater] = useState(user.avatarId);
    const [eligible, setEligible] = useState(user.eligible);

    const handleAvaterSelection = (index) => {
        setAvater(index);
        setUser({ ...user, avatarId: index })
    }

    const handleUsernameInput = (input) => {
        const validInput = input.trim();
        if (validInput === "" || validInput.length > 15) {
            return;
        }
        setUsername(validInput);
        setUser({ ...user, name: validInput });
    }

    const handleUserEligible = () => {
        setEligible(!eligible);
        setUser({ ...user, eligible: !eligible });
    }
    return <div className="py-2">
        <div id='selectons' className="flex flex-col items-center gap-3 mb-5">
            <p className="text-center">请选择头像: </p>
            <div className="grid grid-cols-3 gap-3 max-w-44">
                {
                    idList.map((i) => {
                        return <div className={`w-10 p-2 bg-light border-2 border-medium rounded-md  transition-transform duration-200 ${avatar === i ? ' drop-shadow-md bg-white border-defaultBlack' : ''} hover:drop-shadow-md hover:-translate-y-1`} key={i} onClick={() => handleAvaterSelection(i)}>
                            <AvatarList id={i} customStyle={`${avatar === i ? 'fill-defaultBlack' : 'fill-medium'} `} />
                        </div>
                    })
                }
            </div>
        </div>

        <div id='usernameInput' className="flex flex-col items-center gap-2 mb-5">
            <p>请输入昵称 <span className="text-xs">(限15字)</span> : </p>
            <input
                value={username}
                autoComplete="off"
                minLength={1}
                maxLength={15}
                type='text'
                className={`p-1 w-52 bg-white border-b-2 border-b-medium hover:border-b-defaultBlack focus-within:border-b-defaultBlack outline-none `}
                required
                onChange={(e) => handleUsernameInput(e.target.value)}
            />
        </div>

        <div className="flex gap-2 items-start justify-center">
            <input type="checkbox" className="w-5 h-5 text-blue-600 border-medium rounded focus:ring-blue-500" onChange={handleUserEligible}
                checked={user.eligible ?? false}
            />
            <div>
                <p className="text-sm">我已达到当地法定法规成年年龄。</p>
            </div>
        </div>
    </div>

}