
import axios from "axios";
import React, { useEffect, useState } from "react";
import MessengerSendIcon from "@/public/bot/MessengerSendIcon";
import BotMicOn from "@/public/bot/botIcons/BotMicOn";
import BotMic from "@/public/bot/botIcons/BotMic";
import moment from "moment";
import 'regenerator-runtime/runtime'
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const BotDetail = (props) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [isListening, setisListening] = useState(false)
  const [prompt, setPrompt] = useState("")
   
  useEffect(()=>{
    console.log(transcript)
  },[transcript])
  useEffect(() => {
    if (isListening) {
      SpeechRecognition.startListening({ continuous: true })
      //console.log(transcript)
      setPrompt(transcript)
    }
  }, [isListening, transcript])

  const submitHandler = async (e) => {
    e.preventDefault();

    SpeechRecognition.stopListening();
    if (isListening)
      props.set({ prompt: {text:prompt,time:moment().format("hh:mm A")}, res: {text:"",time:""}, isLoading: true, mode: "audio" })
    else {
      props.set({ prompt: {text:prompt,time:moment().format("hh:mm A")}, res: {text:"",time:""}, isLoading: true, mode: "text" })
    }
    setisListening(false)

    resetTranscript();

    let query=prompt
    setPrompt("")
   const formData=new FormData();
   formData.append('question',query)
    await axios.post(
      'http://127.0.0.1:5000/chat'
    ,formData).then((res) => {
      props.update(false, query, {text:res.data,time:moment().format("hh:mm A")})
     


    });

  };


  return (
    <div className="">
      <div className="px-4 flex items-center space-x-2">
        <div >
          <input onChange={(e) => setPrompt(e.target.value)} value={prompt} className="py-1 px-4 border-[1px] focus:outline-none text-sm flex text-black flex-wrap border-tertiary-400 w-full rounded-r-full rounded-l-full" />
        </div>
        <button
          className={` text-black font-display
    text-sm  px-2 py-1 rounded-full ml-1 h-9 w-9 lg:mb-0
      hover:bg-red-100
    }`} onClick={submitHandler} disabled={prompt == ""}>
          <MessengerSendIcon color={"#fff"} />

        </button>
        {!isListening && <button onClick={() => { setisListening(true) 
        resetTranscript()}}> <BotMic /></button>}
        {isListening && <button onClick={() => {
          SpeechRecognition.stopListening()
          setisListening(false)
        }}> <BotMicOn /></button>}
      </div>
      <div className="py-3">
        <p className="text-xs font-semibold text-tertiarygrey-50 text-center">
          Powered by{" "}
          <span className="underline decoration-tertiarygrey-50">AI</span>
        </p>
      </div>
    </div>
  );
};

export default BotDetail;