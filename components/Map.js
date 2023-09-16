import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = (props) => {
  console.log(props);
  return (
    <div className="text-lg font-bold">
      <img
        src="https://toppng.com/uploads/preview/eat-play-do-icon-map-marker-115548254600u9yjx6qhj.png"
        alt="maps"
        height={30}
        width={30}
        // onClick={() => props.onTouch(props.index)}
      />
      <p className="text-4xl">{"HELLO"}</p>
      {props.text && (
        <div className="text-sm text-black  py-3 px-6 w-[100px] h-fit absolute inset-0 z-50 bg-white">
          {props.t}
        </div>
      )}
    </div>
  );
};

const SimpleMap = (props) => {
  const [text, setText] = useState(-1);
  const [center, setCenter] = useState({ lat: 19.136326, lng: 72.82766 });
  // const [center, setCenter] = useState({ lat: props.lat, lng: props.lng });

  const [zoom, setZoom] = useState(15);
  const textHandler = (i) => {
    setText(i);
  };

  return (
    <div style={{ height: "80vh", width: "100%" }} className="my-3 mx-5">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBet9QEf5utjzcQbAqfrctsS-NWa9wtoCY" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {props.hospital.map((h, i) => {
         return(
          <AnyReactComponent
          key={i}
          index={i}
          lat={h.location.lat}
          lng={h.location.lng}
          t={h.name}
          text={i === text}
          onTouch={textHandler}
        />
         )
         })}
      </GoogleMapReact>
    </div>
  );
};

export default SimpleMap;
