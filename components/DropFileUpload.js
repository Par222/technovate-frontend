import UploadIcon from "../public/UploadIcon";
import Dropzone from "react-dropzone";

function DropFileUpload(props) {
  return (
    <div className="flex justify-center mb-2">
      <Dropzone
        onDrop={(accepted, rejected) =>
          props.uploadFiles(accepted, rejected, props.num)
        }
        accept={{
            "application/pdf": []
          }}
        multiple={true}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className={`
              text-tertiaryBlue-600 block w-[100%] text-center cursor-pointer 
              font-mono
              border-2 border-blue-700 hover:border-blue-800 
              border-dashed p-7 rounded-md transition-all`}
          >
            <input {...getInputProps()} />
            <div className="flex space-x-2 w-full justify-center">
            <p className="flex justify-center">
              <UploadIcon></UploadIcon>
            </p>
            <p
              className="text-sm font-semibold text-tertiary-650"
            >
              {props.msg}
            </p>
            <p className="text-sm font-semibold text-blue-500">
              {props.extension}
            </p>
            </div>
            
          </div>
        )}
      </Dropzone>
    </div>
  )
}

export default DropFileUpload;