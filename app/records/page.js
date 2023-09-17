"use client"
import NavBar from "@/components/Navbar";
import Import from "@/components/Import"
import Bot from "@/components/langchain/bot/Bot"
import "regenerator-runtime/runtime";
import { useEffect,useState } from "react";
const Records=()=>{
    const [showBot, setShowBot] = useState(true);
    return(
        
        <>
         {<Bot showBot={showBot} setShowBot={setShowBot}></Bot>}
        <NavBar></NavBar>
        <div>
            <h1 className="font-extrabold my-3 text-xl mx-5 ">Health Records Maintaince</h1>
            <Import></Import>
        </div>
       
        </>
    )
}
export default Records