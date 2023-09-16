"use client"
import 'regenerator-runtime/runtime'
import NavBar from "@/components/NavBar";
import Bot from "@/components/bot/Bot";
import { useState } from "react";
const Page = () => {
    const [showBot,setShowBot]=useState(false)
  return (
    
    <>
      <NavBar></NavBar>
      <div>
        <>
          <h1 className="mx-5 my-3 font-bold text-2xl">Matched Donor</h1>
          <div className="mx-5 shadow-md flex items-center w-[50%] items-center">
            <img
              className="w-[350px] h-[350px]"
              src="https://profilemagazine.com/wp-content/uploads/2022/12/Kenneth-Miles-First-Fidelity-Bank-thumbnail.jpg"
            ></img>
            <div className="mx-4"> 
              <p className="text-base font-medium my-1">
                Name: <span className="text-blue-600  ">{"Arun Mehta"}</span>
              </p>
              <p className=" font-medium my-1">
                Weight: <span className="text-blue-600  ">{"84 kg"}</span>
              </p>
              <p className=" font-medium my-1">
                Height:{" "}
                <span className="text-blue-600  ">{"178 cm"}</span>
              </p>
              <p className=" font-medium my-1">
                Age: <span className="text-blue-600  ">{"39"}</span>
              </p>
              <p className=" font-medium my-1">
                Organ: <span className="text-blue-600  ">{"Kidney"}</span>
              </p>
              <p className=" font-medium my-1">
                Blood Group:{" "}
                <span className="text-blue-600  ">O+</span>
              </p>
              <button className="mt-7 bg-blue-600 text-white py-2 px-4 rounded-md" onClick={()=>setShowBot(true)}>Start Chat</button>
            </div>
          </div>
        </>
        {<Bot showBot={showBot} setShowBot={setShowBot} ></Bot>}
      </div>
    </>
  );
};
export default Page;
