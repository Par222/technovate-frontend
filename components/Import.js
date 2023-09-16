"use client"

import { Spreadsheet } from "react-spreadsheet";
import { useEffect, useState } from "react";
import * as xlsx from 'xlsx';
import Grid from "./Grid";
const Import = () => {
  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        console.log(json);
        setCsvData(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };
  let value = [];
  const [data, setData] = useState();
  const [csvData, setCsvData] = useState();
  useEffect(() => {
    if (!csvData) return;
    let AllKeys = Object.keys(csvData[0]);
    let arr = [];
    for (let i = 0; i < AllKeys.length; i++) {
      let newObject = { value: AllKeys[i] };
      arr.push(newObject);
    }
    value.push(arr);
    //setData([...data,arr])

    for (let j = 0; j < Math.min(25,csvData.length); j++) {
      let z = [];
      for (let i = 0; i < AllKeys.length; i++) {
        let newObject = { value: csvData[j][AllKeys[i]] };
        z.push(newObject);
      }
      value.push(z);
      console.log(z);
    }
    setData(value);
  }, [csvData]);
  const [view,setView]=useState(false)

  return (
    <>
      <div className="flex  space-x-5 mx-10">
        <div className="w-[50%] flex flex-col">
          <form className="flex flex-col">
            <input
              type="file"
              name="upload"
              id="upload"
              className="my-2 text-sm"
              onChange={readUploadFile}
            />
          </form>
        
          {data && <><div className="w-[100%] overflow-x-auto overflow-y-auto h-[300px]">
            <Spreadsheet data={data}></Spreadsheet>
          </div>
          <button className="bg-blue-800 py-2 px-5 rounded-md text-red-50 w-[30%] my-4" onClick={()=>setView(true)}>
            Generate Data Cube
          </button></>}
          
        </div>
        {view && csvData && <div className="w-[50%] overflow-x-auto">
          <Grid data={csvData}></Grid>
        </div>}
        
        
      </div>
    </>
  );
};
export default Import;
