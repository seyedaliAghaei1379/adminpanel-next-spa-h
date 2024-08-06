"use client";

import Link from "next/link";
import {useUser} from "../../context/UserContext";
import {logout} from "@/services/authServices";

export default function Home() {

    const {user} = useUser()
    if(user?.token){
        return (
            <div className="bg-zinc-300 flex justify-center items-center">
                <Link href={"/panel"} className="text-white bg-slate-600 p-4 rounded-xl ">go to panel</Link>
                <button onClick={() => {logout()}} className="text-white bg-slate-600 p-4 rounded-xl ">logout</button>
            </div>
        )
    }else{
        return (
            <div className="bg-zinc-300 flex justify-center items-center">
                <Link href={"/auth/signin"} className="text-white bg-slate-600 p-4 rounded-xl ">sign in</Link>
            </div>
        );
    }

}
