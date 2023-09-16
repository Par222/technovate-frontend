"use client";
import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";

const Hospital = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
      
        setLat(pos.coords.latitude+"");
        setLng(pos.coords.longitude+"");
        console.log(typeof(pos.coords.latitude+""))
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
        'X-RapidAPI-Key': '7d76f9f672msh7cd887592494cd8p18d467jsn12a3f621230b',
        'X-RapidAPI-Host': 'nearby-places.p.rapidapi.com'
      }
      
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    console.log(lat);
    if (lat && lng) {
      fetchNearby();
    }
  }, [lat, lng]);
  return (
    <>
      <NavBar></NavBar>
      <div className="mx-5">
        <div className=" my-5 text-2xl font-extrabold ">
          Lets Make the Transplant easy
        </div>
        <form>
          <input
            className="focus:outline-none border-b-2 border-blue-600 my-1 mx-2 py-2 px-0 w-[30%] rounded-sm"
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
      </div>
    </>
  );
};
export default Hospital;
