"use client";
import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import SimpleMap from "@/components/Map";
import GoogleMapReact from "google-map-react";
import { hospital } from "@/components/hospital";
import GenericModal from "@/components/GenericModal";
import { donors } from "@/components/donor";
const Hospital = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const defaultProps = {
    center: {
      lat: "19.1159576",
      lng: "72.8397202",
    },
    zoom: 11,
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLat(pos.coords.latitude + "");
        setLng(pos.coords.longitude + "");
        console.log(typeof (pos.coords.latitude + ""));
      });
    }
  };
  const fetchNearby = async () => {
    const options = {
      method: "GET",
      url: "https://nearby-places.p.rapidapi.com/v2/nearby",
      params: {
        lat: { lat },
        lng: { lng },
        type: "hospital",
        radius: "2000",
      },
      headers: {
        "X-RapidAPI-Key": "7d76f9f672msh7cd887592494cd8p18d467jsn12a3f621230b",
        "X-RapidAPI-Host": "nearby-places.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const [hos, setAllHospitals] = useState([]);
  useEffect(() => {
    console.log(lat);
    if (lat && lng) {
      setAllHospitals(hospital);
    }
  }, [lat, lng]);
  const [modal, setModal] = useState(false);
  const [applyForSurgery, setApplyForSurgery] = useState(false);
  return (
    <>
      <NavBar></NavBar>
      <div className="mx-5 flex">
        <div className="w-[40%]">
          <div className=" my-5 text-2xl font-extrabold ">
            Lets Make the Transplant easy
          </div>
          <form className="flex w-[100%]">
            <input
              className="focus:outline-none border-b-2 border-blue-600 my-1 mx-2 py-1 px-0 w-[100%] rounded-sm"
              placeholder="Search for hospitals"
            ></input>
            <button className="bg-blue-600 text-white py-1 px-5 rounded-md">
              Search
            </button>
          </form>
          <button
            onClick={getLocation}
            className="my-4 bg-green-500 text-white py-2 px-4 rounded-md"
          >
            Find Nearby Hospital
          </button>
          <div className="flex flex-col w-[90%] ">
            {hos.map((h) => (
              <>
                <div className="shadow-md my-4 py-3 px-5">
                  <p className="text-lg font-bold">{h.name}</p>
                  <p className="text-sm my-1">{h.address}</p>
                  <p className="text-sm my-1 ">
                    {h.distanceMeter + "m " + "away"}
                  </p>
                  <p className="text-sm my-1 ">{"Phone : " + h.phone}</p>
                  <div className="flex justify-end text-sm">
                    <button
                      className="mx-3 bg-blue-800 text-white rounded-md py-2 px-3"
                      onClick={() => setModal(true)}
                    >
                      Request Transfer
                    </button>
                    <button
                      className="mx-3 bg-blue-400 text-white rounded-md py-2 px-3"
                      onClick={() => setApplyForSurgery(true)}
                    >
                      Apply for Surgery
                    </button>
                  </div>
                </div>
                {modal && (
                  <GenericModal
                    title="Surgery details"
                    textpos="Okay"
                    textneg="Cancel"
                    closeHandler={() => setModal(false)}
                  >
                    <form className="mx-5 my-2 flex flex-col text-sm">
                      <label className="text-black font-medium my-1">
                        Organ Name
                      </label>
                      <input
                        className="focus:outline-none border-b-2 border-blue-700 w-[50%] py-1 "
                        placeholder="Type organ name here.."
                      ></input>
                      <label className="text-black font-medium my-2">
                        Select Appointment Time
                      </label>
                      <input
                        type="datetime-local"
                        className="focus:outline-none border-b-2 border-blue-700 w-[50%] py-1 "
                      ></input>
                       <label className="text-black font-medium my-2">
                        Provide a Reason for Organ Transplant
                      </label>
                      <textarea
                        type="text"
                        className="focus:outline-none border-2 border-black px-1 w-[50%] py-1"
                        rows={4}
                      ></textarea>
                      <div>
                     
                        
                        <p className="my-3 font-bold">Check For organ health</p>
                      </div>
                    </form>
                  </GenericModal>
                )}
              </>
            ))}
            {applyForSurgery && (
              <GenericModal
                title="Surgery details"
                textpos="Okay"
                textneg="Cancel"
                closeHandler={() => setApplyForSurgery(false)}
              >
                <form className="mx-5 my-2 flex flex-col text-sm">
                  <label className="text-black font-medium my-1">
                    Organ Name
                  </label>
                  <input
                    className="focus:outline-none border-b-2 border-blue-700 w-[50%] py-1 "
                    placeholder="Type organ name here.."
                  ></input>
                  <label className="text-black font-medium my-2">
                    Select Appointment Time
                  </label>
                  <input
                    type="datetime-local"
                    className="focus:outline-none border-b-2 border-blue-700 w-[50%] py-1 "
                  ></input>
                    <label className="text-black font-medium my-2">
                        Provide a Reason for Organ Transplant
                      </label>
                      <textarea
                        type="text"
                        className="focus:outline-none border-2 border-black px-1 w-[50%] py-1"
                        rows={4}
                      ></textarea>
                  <div className="flex flex-col">
                    <p className="my-4 font-bold ">Avaliable Donors</p>
                    {donors.map((d) => (
                      <>
                        <div className="flex justify-between text-xs shadow-md my-2 font-medium items-center py-1 px-5">
                          <img
                            src={d.img}
                            className="w-[50px] h-[50px] rounded-full"
                          ></img>
                          <span>{d.name}</span>
                          <span>{d.gender}</span>
                          <span>{d.organ}</span>
                          <span>{d.bloodGroup}</span>
                          <button className="bg-green-500 text-white py-1 px-3 rounded-md">
                            Select
                          </button>
                        </div>
                      </>
                    ))}
                  </div>
                </form>
              </GenericModal>
            )}
          </div>
        </div>
        <div className="w-[50%]">
          {lat && lng && <SimpleMap hospital={hos}></SimpleMap>}
        </div>
      </div>
    </>
  );
};
export default Hospital;
