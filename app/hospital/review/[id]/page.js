'use client';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import NavBar from '@/components/NavBar';
import DeclineModal from '@/components/DeclineModal';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { Document, Page, pdfjs } from 'react-pdf';
import GenericModal from '@/components/GenericModal';
export default function Review({ params }) {
  const [modal, setModal] = useState(false);
  const [pdfModal, setPdfModal] = useState(false);
  const [numPages, setNumPages] = useState(1);
  const [declineMsg, setdeclineMsg] = useState('');

  const [decision, setD] = useState('wait');
  const fileUrl = `C:/jai/Code/hackathon23/technovate-frontend/p.pdf`;

  const [data, setData] = useState([{ organQueue: [] }]);

  const getMatches = async () => {
    const _id = params.id;

    const url = 'https://technovate-backend.onrender.com/donor/donor';
    try {
      await axios
        .post(url, {
          donor_id: _id,
        })
        .then((el) => {
          console.log(el.data);
          setData(el?.data?.data);
        });
    } catch (err) {}
  };

  useEffect(() => {
    getMatches();
  }, []);

  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const router = useRouter();

  const approveHandler = async (status, mssg) => {
    console.log(status, mssg);
    axios
      .post('https://technovate-backend.onrender.com/hospital/match', {
        recipient_id: data?.organQueue[0]?._id,
        donor_id: data?.donorId?._id,
        status: status,
        decline_message: declineMsg,
      })
      .then((el) => {
        console.log(el.data);
        setD('approved');
        router.push('/hospital/home');
      })
      .catch((err) => {});
  };

  return (
    <>
      {pdfModal && (
        <GenericModal
          title="Medical Reports"
          textpos="Okay"
          textneg="Cancel"
          closeHandler={() => setPdfModal(false)}
        >
          <div>
            <Document file={'/p.pdf'} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
            <p>
              Page {pageNumber} of {numPages}
            </p>
          </div>
        </GenericModal>
      )}
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
              value={declineMsg}
              onChange={(e) => setdeclineMsg(e.target.value)}
              className="p-1 border-2"
              name=""
              id=""
              cols="30"
              rows="8"
            ></textarea>
          </div>
          <div className="flex gap-3 px-4 text-white">
            <button
              onClick={() => approveHandler('Rejected', declineMsg)}
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
          {data?.organQueue && (
            <div>
              <div className="flex justify-around w-4/5 mx-auto p-3 py-4  px-3 border-2 ">
                <div className="">
                  <div className="font-bold text-lg">Donor's Details</div>
                  <div className="w-full m-3">
                    <table>
                      <tbody>
                        <tr>
                          <td className="p-2 mr-2 font-bold">Name: </td>
                          <td className="p-2 mr-2">
                            {data?.donorId?.fullname}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 mr-2 font-bold">Age:</td>
                          <td className="p-2 mr-2">{data?.donorId?.age}</td>
                        </tr>
                        <tr>
                          <td className="p-2 mr-2 font-bold">Gender: </td>
                          <td className="p-2 mr-2">{data?.donorId?.gender}</td>
                        </tr>
                        <tr>
                          <td className="p-2 mr-2 font-bold">Weight: </td>
                          <td className="p-2 mr-2">78 Kg</td>
                        </tr>
                        <tr>
                          <td className="p-2 mr-2 font-bold">Blood Group: </td>
                          <td className="p-2 mr-2">
                            {data?.donorId?.blood_group}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 mr-2 font-bold">Organ: </td>
                          <td className="p-2 mr-2">{data?.donorId?.organ}</td>
                        </tr>
                        <tr>
                          <td className="p-2 mr-2 font-bold">Height: </td>
                          <td className="p-2 mr-2">170 cm</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="font-bold text-lg mt-4">Health Records</div>
                  <div className="flex flex-col ml-2 mt-2 gap-4">
                    {[1].map((el) => (
                      <div className="container bg-green-400 px-3 py-3 text-sm rounded-lg shadow-md">
                        <div
                          className="font-bold"
                          onClick={() => setPdfModal(true)}
                        >
                          Lungs health
                        </div>
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
                          <td className="p-2 mr-2">
                            {data?.organQueue[0]?.fullname}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 mr-2 font-bold">Age: </td>
                          <td className="p-2 mr-2">
                            {data?.organQueue[0]?.age}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 mr-2 font-bold">Gender: </td>
                          <td className="p-2 mr-2">
                            {data?.organQueue[0]?.gender}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 mr-2 font-bold">Weight: </td>
                          <td className="p-2 mr-2">120 Kg</td>
                        </tr>
                        <tr>
                          <td className="p-2 mr-2 font-bold">Blood Group: </td>
                          <td className="p-2 mr-2">
                            {data?.organQueue[0]?.blood_group}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 mr-2 font-bold">Organ: </td>
                          <td className="p-2 mr-2">{data?.donorId?.organ}</td>
                        </tr>
                        <tr>
                          <td className="p-2 mr-2 font-bold">Height: </td>
                          <td className="p-2 mr-2">170 cm</td>
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
                    onClick={() => approveHandler('Approved', '')}
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
          )}
        </div>
      </div>
    </>
  );
}
