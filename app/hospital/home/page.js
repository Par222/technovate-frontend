'use client';
import { Autocomplete } from '@mui/material';
import React from 'react';
import Link from 'next/link';
import { TextFields } from '@mui/icons-material';
import TextField from '@mui/material/TextField';

// import {AppointmentModal}
import AppointmentModal from '@/components/AppointmentModal';
import { Sidebar } from '@/components/Sidebar';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/Navbar';
import { useState } from 'react';
export default function home() {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const appointmentHandler = () => {
    setModal(false);
  };
  const appointmentDeclineHandler = () => {
    setModal(false);
  };

  return (
    <>
      {modal && (
        <AppointmentModal
          title={'Approve Appointment'}
          isStepModal={false}
          closeHandler={() => setModal(!modal)}
          appointmentHandler={appointmentHandler}
          appointmentDeclineHandler={appointmentDeclineHandler}
        >
          <div className="flex flex-col p-5 gap-5">
            <div className="text-center font-bold ">Heart Transplant</div>
            <div>
              <div className="font-medium">
                Donor: <span>Jai</span>
              </div>
              <div className=" font-medium">
                Recipient: <span>Paras</span>
              </div>
            </div>
            <div className="mt">
              <div className="font-medium">Change date and time</div>
              <input type="datetime-local" />
            </div>
            <div>
              <div className="font-medium mb-2">Assign Doctors</div>
              <Autocomplete
                multiple
                limitTags={2}
                onChange={(eve, val) => console.log(val)}
                id="multiple-limit-tags"
                options={['Jai Patel', 'Paras Mehta', 'Keyur Menon']}
                // getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    size="1"
                    {...params}
                    label="limitTags"
                    placeholder="Favorites"
                  />
                )}
                sx={{ width: '500px' }}
              />
            </div>
          </div>
        </AppointmentModal>
      )}
      <NavBar />
      <div className="flex position-relative h-screen ">
        <div className="p-5 flex flex-col gap-5 w-full">
          <div className="text-xl text-center">Niranjan Hospital</div>
          <div className="pl-4 pt-3 font-bold">Match Requests</div>
          <div className="ml-4 p-2 flex  justify-start gap-4 flex-wrap">
            {[1, 1, 1, 1].map((el) => (
              <div className="container bg-green-400 px-3 py-3 w-1/5 text-sm rounded-lg shadow-md">
                <div className="flex justify-between">
                  <div className="text-sm font-bold ">
                    Donor: <span>Jai</span>
                  </div>
                  <div className="text-sm font-bold">
                    Recipient: <span>Paras</span>
                  </div>
                </div>

                <div className="mt-7 flex justify-between items-center">
                  <button
                    onClick={() => router.push('/hospital/review/1')}
                    className="bg-blue-300 px-4 py-2 rounded-md"
                  >
                    Review
                  </button>
                  <div className="text-sm px-2 py-1 rounded-full border-2 inline-block border-black">
                    Heart
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pl-4 pt-3 font-bold">Appointment Requests</div>
          <div className="ml-4 p-2 flex  justify-start gap-4 flex-wrap">
            {[1, 1].map((el) => (
              <div className="container bg-green-400 px-3 py-3 w-1/5 text-sm rounded-lg shadow-md">
                <div className="font-bold">Heart Transplant</div>
                <div className="py-2 text-">
                  <div className="">29th September, 2021</div>
                  <div className="">Tuseday</div>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <button
                    className="bg-blue-300 px-4 py-2 rounded-md"
                    onClick={() => setModal(true)}
                  >
                    Assign Doctors
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
