'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import NavBar from '@/components/Navbar';
import DeclineModal from '@/components/DeclineModal';
export default function Review() {
  const [modal, setModal] = useState(false);
  const [decision, setD] = useState('wait');
  return (
    <>
      {modal && (
        <DeclineModal
          footer={false}
          title="Decline Reason"
          textpos={'Close'}
          textneg={''}
          closeHandler={() => setModal(false)}
        >
          <div className="p-3">
            <h3 className="font-bold mb-2">Specify reason for rejection</h3>
            <textarea
              className="border-2"
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div className="flex gap-3 px-4 text-white">
            <button
              className="bg-green-500 px-4 py-2 rounded-md"
              onClick={() => {
                setModal(false);
              }}
            >
              Confirm Appointment
            </button>
            <button
              onClick={() => setModal(false)}
              className="bg-red-500 px-4 py-2 rounded-md"
            >
              Decline
            </button>
          </div>
        </DeclineModal>
      )}
      <NavBar />
      <div className="flex position-relative h-screen">
        <div className="p-5 flex flex-col gap-5 w-full">
          <div className="text-xl text-center"> Niranjan Hospital</div>
          <div className="flex justify-around w-4/5 mx-auto p-3 py-4  px-3 border-2 ">
            <div className="">
              <div className="font-bold text-lg">Donor's Details</div>
              <div className="w-full m-3">
                <table>
                  <tbody>
                    <tr>
                      <td className="p-2 mr-2 font-bold">Name: </td>
                      <td className="p-2 mr-2">Jai Patel</td>
                    </tr>
                    <tr>
                      <td className="p-2 mr-2 font-bold">Age: </td>
                      <td className="p-2 mr-2">19</td>
                    </tr>
                    <tr>
                      <td className="p-2 mr-2 font-bold">Gender: </td>
                      <td className="p-2 mr-2">Male</td>
                    </tr>
                    <tr>
                      <td className="p-2 mr-2 font-bold">Weight: </td>
                      <td className="p-2 mr-2">19</td>
                    </tr>
                    <tr>
                      <td className="p-2 mr-2 font-bold">Blood Group: </td>
                      <td className="p-2 mr-2">A+</td>
                    </tr>
                    <tr>
                      <td className="p-2 mr-2 font-bold">Organ: </td>
                      <td className="p-2 mr-2">Lungs</td>
                    </tr>
                    <tr>
                      <td className="p-2 mr-2 font-bold">Weight: </td>
                      <td className="p-2 mr-2">70</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="font-bold text-lg mt-4">Health Records</div>
              <div className="flex flex-col ml-2 mt-2 gap-4">
                {[1].map((el) => (
                  <div className="container bg-green-400 px-3 py-3 text-sm rounded-lg shadow-md">
                    <div className="font-bold">Lungs health</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="">
              <div className="font-bold text-lg">Recipient's Details</div>
              <div className="w-full m-3">
                <table>
                  <tbody>
                    <tr>
                      <td className="p-2 mr-2 font-bold">Name: </td>
                      <td className="p-2 mr-2">Paras Mehta</td>
                    </tr>
                    <tr>
                      <td className="p-2 mr-2 font-bold">Age: </td>
                      <td className="p-2 mr-2">19</td>
                    </tr>
                    <tr>
                      <td className="p-2 mr-2 font-bold">Gender: </td>
                      <td className="p-2 mr-2">Male</td>
                    </tr>
                    <tr>
                      <td className="p-2 mr-2 font-bold">Weight: </td>
                      <td className="p-2 mr-2">19</td>
                    </tr>
                    <tr>
                      <td className="p-2 mr-2 font-bold">Blood Group: </td>
                      <td className="p-2 mr-2">A+</td>
                    </tr>
                    <tr>
                      <td className="p-2 mr-2 font-bold">Organ: </td>
                      <td className="p-2 mr-2">Lungs</td>
                    </tr>
                    <tr>
                      <td className="p-2 mr-2 font-bold">Weight: </td>
                      <td className="p-2 mr-2">70</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="font-bold text-lg mt-6">Health Records</div>
              <div className="flex flex-col ml-2 mt-2 gap-4">
                {[1].map((el) => (
                  <div className="container bg-green-400 px-3 py-3 text-sm rounded-lg shadow-md">
                    <div className="font-bold">Lungs health</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-5 flex text-white justify-center gap-4">
            {(decision == 'wait' || decision == 'approved') && (
              <button
                className="bg-green-500 px-4 py-2 rounded-md"
                onClick={() => setD('approved')}
              >
                {decision == 'wait' ? 'Approve Request' : 'Approved'}
              </button>
            )}
            {(decision == 'wait' || decision == 'declined') && (
              <button
                onClick={() => setModal(true)}
                className="bg-red-500 px-4 py-2 rounded-md"
              >
                Decline
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
