'use client';
import 'regenerator-runtime/runtime';
import { donors } from '@/components/donor';
import NavBar from '@/components/NavBar';
import Bot from '@/components/bot/Bot';
import { useState } from 'react';
import GenericModal from '@/components/GenericModal';

const Page = () => {
  const [showBot, setShowBot] = useState(false);
  const [details, setDetails] = useState(false);
  const [donor, setDonor] = useState(null);
  const [waitList, setWaitingList] = useState(false);
  return (
    <>
      <NavBar></NavBar>
      <div>
        <>
          <h1 className="mx-5 my-3 font-bold text-2xl">Matched Donor</h1>
          <div className="flex space-x-6">
            <div className="mx-5 shadow-md flex w-[50%] items-center">
              <img
                className="w-[350px] h-[350px]"
                src="https://profilemagazine.com/wp-content/uploads/2022/12/Kenneth-Miles-First-Fidelity-Bank-thumbnail.jpg"
              ></img>
              <div className="mx-4">
                <p className="text-base font-medium my-1">
                  Name: <span className="text-blue-600  ">{'Arun Mehta'}</span>
                </p>
                <p className=" font-medium my-1">
                  Weight: <span className="text-blue-600  ">{'84 kg'}</span>
                </p>
                <p className=" font-medium my-1">
                  Height: <span className="text-blue-600  ">{'178 cm'}</span>
                </p>
                <p className=" font-medium my-1">
                  Age: <span className="text-blue-600  ">{'39'}</span>
                </p>
                <p className=" font-medium my-1">
                  Organ: <span className="text-blue-600  ">{'Kidney'}</span>
                </p>
                <p className=" font-medium my-1">
                  Blood Group: <span className="text-blue-600  ">O+</span>
                </p>
                <button
                  className="mt-7 bg-blue-600 text-white py-2 px-4 rounded-md"
                  onClick={() => setShowBot(true)}
                >
                  Start Chat
                </button>
              </div>
            </div>
            <div className="w-[40%]">
              <h1 className="font-bold">Pending Waitlist</h1>
              <div className="w-full">
                <div className="flex  w-[90%]  text-xs shadow-md my-2 font-medium items-center py-1 px-5 bg-green-500 text-white">
                  <div className="w-[10%]">
                    <img
                      src={
                        'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg'
                      }
                      className="w-[50px] h-[50px] rounded-full"
                    ></img>
                  </div>
                  <div className="flex  w-[70%]">
                    <span className="mx-4 w-[30%]">{'You'}</span>

                    <span className="mx-3 w-[20%]">{'Kidney'}</span>
                  </div>
                </div>
                {donors.map((d) => (
                  <>
                    <div className="flex  w-[90%]  text-xs shadow-md my-2 font-medium items-center py-1 px-5">
                      <div className="w-[10%]">
                        <img
                          src={d.img}
                          className="w-[50px] h-[50px] rounded-full"
                        ></img>
                      </div>
                      <div className="flex w-[70%]">
                        <span className="mx-4 w-[30%]">{d.name}</span>

                        <span className="mx-3 w-[20%]">{'Kidney'}</span>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className="my-2 mx-5">
            <h1 className="font-bold mx-5 my-4">Applied Donors</h1>

            <div className="flex space-x-5 mx-2">
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
        {<Bot showBot={showBot} setShowBot={setShowBot}></Bot>}
      </div>
    </>
  );
};
export default Page;
