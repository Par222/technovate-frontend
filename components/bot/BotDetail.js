'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MessengerSendIcon from '../../public/bot/MessengerSendIcon';
import BotMicOn from '../../public/bot/botIcons/BotMicOn';
import BotMic from '../../public/bot/botIcons/BotMic';
import moment from 'moment';
import SocketIOClient from 'socket.io-client';
import GptHelper from '@/components/GptHelper';
import 'regenerator-runtime/runtime';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

const BotDetail = (props) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [isListening, setisListening] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [chat, pushChat] = [];

  useEffect(() => {
    console.log(transcript);
  }, [transcript]);
  useEffect(() => {
    if (isListening) {
      SpeechRecognition.startListening({ continuous: true });
      //console.log(transcript)
      setPrompt(transcript);
    }
  }, [isListening, transcript]);

  const [currentMessage, setCurrentMessage] = useState('');

  const [connected, setConnected] = useState(false);

  const [disabled, setdisabled] = useState(false);

  // init chat and message

  const [sock, setsock] = useState();

  const addSelfMessage = (message) => {
    const ele = (
      <div className="text-left p-1  ml-auto block w-3/5 bg-blue-200 rounded-md">
        <div>{message}</div>
      </div>
    );
    return ele;
    // pushChat((prev) => [...prev, ele]);
  };

  const addOppMessage = (message) => {
    const ele = (
      <div className="text-left p-1 mr-auto block w-3/5 bg-green-200 rounded-md">
        <div>{message}</div>
      </div>
    );
    return ele;
    // pushChat((prev) => [...prev, ele]);
  };

  useEffect(() => {
    const socket = SocketIOClient.connect('https://chat-app-3hbu.onrender.com');
    // log socket connection
    socket.on('connect', () => {
      console.log('SOCKET CONNECTED!', socket.id);
      setConnected(true);
    });

    console.log(socket);
    // update chat on new message dispatched
    socket.on('message', (message) => {
      // chat.push(message);
      if (disabled) return;
      console.log(prompt);
      props.appendMessage(addOppMessage(message));
      setPrompt('');
    });
    setsock(socket);

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setPrompt(prompt);
    setCurrentMessage(prompt);

    SpeechRecognition.stopListening();
    // if (isListening)
    //   props.set({
    //     prompt: { text: prompt, time: moment().format('hh:mm A') },
    //     res: { text: '', time: '' },
    //     isLoading: true,
    //     mode: 'audio',
    //   });
    // else {
    //   props.set({
    //     prompt: { text: prompt, time: moment().format('hh:mm A') },
    //     res: { text: '', time: '' },
    //     isLoading: true,
    //     mode: 'text',
    //   });
    // }
    // setisListening(false);

    resetTranscript();

    props.appendMessage(addSelfMessage(prompt));
    let query = prompt;
    setPrompt('');

    // props.set(query, false);
    sock.emit('message', query);
    addSelfMessage(prompt);

    let resp = await GptHelper.checkProfanity(query);
    if (resp?.content == 'Yes.' || resp?.content == 'Yes') {
      setdisabled(true);
      props.handleIllegal();
    } else setdisabled(false);
  };

  return (
    <div className="">
      {disabled ? (
        <div className="px-4 flex items-center space-x-2 font-medium text-center text-red-500">
          The chat has been blocked over illegal concerns
        </div>
      ) : (
        <div className="px-4 flex items-center space-x-2">
          <div>
            <input
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              className="py-1 px-4 border-[1px] focus:outline-none text-sm flex text-black flex-wrap border-tertiary-400 w-full rounded-r-full rounded-l-full"
            />
          </div>
          <button
            className={` text-black font-display
    text-sm  px-2 py-1 rounded-full ml-1 h-9 w-9 lg:mb-0
      hover:bg-red-100
    }`}
            onClick={submitHandler}
            disabled={prompt == ''}
          >
            <MessengerSendIcon color={'#fff'} />
          </button>
          {!isListening && (
            <button
              onClick={() => {
                setisListening(true);
                resetTranscript();
              }}
            >
              {' '}
              <BotMic />
            </button>
          )}
          {isListening && (
            <button
              onClick={() => {
                SpeechRecognition.stopListening();
                setisListening(false);
              }}
            >
              {' '}
              <BotMicOn />
            </button>
          )}
        </div>
      )}
      <div className="py-3"></div>
    </div>
  );
};

export default BotDetail;
