"use client";
import "regenerator-runtime/runtime";
import { donors } from "@/components/donor";
import NavBar from "@/components/NavBar";
import Bot from "@/components/bot/Bot";
import { useState, useEffect } from "react";
import GenericModal from "@/components/GenericModal";
import { Bar, Doughnut } from "react-chartjs-2";
import axios from "axios";
import { async } from "regenerator-runtime";
const Page = () => {
  const [showBot, setShowBot] = useState(false);
  const [details, setDetails] = useState(false);
  const [donor, setDonor] = useState(null);
  const [waitList, setWaitingList] = useState(false);
  const [matches, setMatches] = useState();
  const fetchSummary = async () => {
    const response = await axios.post(
      "https://technovate-backend.onrender.com/recipient/match",
      {
        recipient_id: localStorage.getItem("user_id"),
      }
    );
    setMatches(response.data.data);
    console.log(response.data);
  };
  const [waiting,setWaiting] =useState()
  const fetchWaiting = async () => {
    const response = await axios.post(
      "https://technovate-backend.onrender.com/recipient/status",
      {
        recipient_id: localStorage.getItem("user_id"),
      }
    );
    setWaiting(response.data.data);
    console.log(response.data);
  };
  
  useEffect(() => {
    fetchSummary();
    fetchWaiting();
  }, []);
  return (
    <>
      <NavBar></NavBar>
      <div>
        <>
          <h1 className="mx-5 my-3 font-bold text-xl">Matched Donors</h1>
          <div className="grid  grid-cols-2 space-x-6">
            {matches &&
              matches.map((m) => {
                

                return (
                  <div className="mx-5 shadow-md flex w-[90%] items-center my-5">
                    <img
                      className="w-[350px] h-[350px]"
                      src="https://profilemagazine.com/wp-content/uploads/2022/12/Kenneth-Miles-First-Fidelity-Bank-thumbnail.jpg"
                    ></img>
                    <div className="mx-4">
                      <p className="text-base font-medium my-1">
                        Name:{" "}
                        <span className="text-blue-600  ">{m.donorId.fullname}</span>
                      </p>
                      <p className=" font-medium my-1">
                        Weight:{" "}
                        <span className="text-blue-600  ">{"84 kg"}</span>
                      </p>
                      <p className=" font-medium my-1">
                        Height:{" "}
                        <span className="text-blue-600  ">{"178 cm"}</span>
                      </p>
                      <p className=" font-medium my-1">
                        Age: <span className="text-blue-600  ">{m.donorId.age}</span>
                      </p>
                      <p className=" font-medium my-1">
                        Organ:{" "}
                        <span className="text-blue-600  ">{m.donorId.organ}</span>
                      </p>
                      <p className=" font-medium my-1">
                        Blood Group: <span className="text-blue-600  ">{m.donorId?.blood_group}</span>
                      </p>
                      <p className=" font-medium my-1">
                        Request Status: <span className="text-blue-600  ">{m.status}</span>
                      </p>
                      {m.status=="Approved" &&<button
                        className="mt-7 bg-blue-600 text-white py-2 px-4 rounded-md"
                        onClick={() => setShowBot(true)}
                      >
                        Start Chat
                      </button>}
                      {
                        m.status=="Rejected" &&<>
                        Reason: <span className="text-red-600  ">{m.decline_message}</span>
                        </>
                      }
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="my-2 mx-5">
            <h1 className="font-bold mx-5 my-4 text-center">Applied Donors</h1>

            <div className="flex space-x-5 mx-2 justify-center">
              {donors.map((d) => (
                <div className="flex flex-col items-center mx-2 shadow-md">
                  <img src={d.img} className="h-[250px] rounded-t-md"></img>
                  <p className="text-white bg-blue-600 w-full py-2 px-4 text-center font-semibold ">
                    {d.name}
                  </p>
                  <div className="my-4 mx-2">
                    <div className=" flex space-x-3">
                      <button
                        className="bg-blue-600 text-white text-sm py-1 px-4 rounded-md my-2"
                        onClick={() => {
                          setDetails(true);
                          setDonor(d);
                        }}
                      >
                        Details
                      </button>
                      <button
                        className="bg-green-500 text-white text-sm py-1 px-4 rounded-md my-2"
                        onClick={() => {
                          setWaitingList(true);
                          setDonor(d);
                        }}
                      >
                        Check Waiting List
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
        {waitList && (
          <>
            <GenericModal
              title="Waiting List"
              textpos="Okay"
              textneg="Cancel"
              closeHandler={() => setWaitingList(false)}
            >
              {donor &&
                donors.map((d) => (
                  <>
                    <div className="flex mx-5  w-[90%]  text-xs shadow-md my-2 font-medium items-center py-1 px-5">
                      <div className="w-[10%]">
                        <img
                          src={d.img}
                          className="w-[50px] h-[50px] rounded-full"
                        ></img>
                      </div>
                      <div className="flex w-[70%]">
                        <span className="mx-4 w-[30%]">{d.name}</span>

                        <span className="mx-3 w-[20%]">{donor.organ}</span>
                      </div>
                    </div>
                  </>
                ))}
              <div className="flex mx-5  w-[90%]   text-xs shadow-md my-2 font-medium items-center py-1 px-5 bg-green-500 text-white">
                <div className="w-[10%]">
                  <img
                    src={
                      "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                    }
                    className="w-[50px] h-[50px] rounded-full"
                  ></img>
                </div>
                <div className="flex items-center   w-[70%]">
                  <span className="mx-4 w-[30%]">{"You"}</span>

                  <span className="mx-3 w-[20%]">{donor.organ}</span>
                  <div className="flex justify-end w-[50%]">
                    <button className="bg-green-200 text-green-800 py-1 px-5 rounded-sm">
                      Withdraw
                    </button>
                  </div>
                </div>
              </div>
            </GenericModal>
          </>
        )}
        {<Bot setShowBot={setShowBot} showBot={showBot}></Bot>}
      </div>
    </>
  );
};
export default Page;
