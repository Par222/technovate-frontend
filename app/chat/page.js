'use client';
import { useState, useEffect } from 'react';
import SocketIOClient from 'socket.io-client';
import GptHelper from '@/components/GptHelper';

const Chat = () => {
  // State to store the messages
  const [messages, setMessages] = useState([]);
  // State to store the current message
  const [currentMessage, setCurrentMessage] = useState('');

  // connected flag
  const [connected, setConnected] = useState(false);

  // init chat and message
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState('');

  const [sock, setsock] = useState();

  useEffect(() => {
    // connect to socket server
    const socket = SocketIOClient.connect('https://chat-app-3hbu.onrender.com');
    // log socket connection
    socket.on('connect', () => {
      console.log('SOCKET CONNECTED!', socket.id);
      setConnected(true);
    });

    console.log(socket);
    // update chat on new message dispatched
    socket.on('message', (message) => {
      chat.push(message);
      setChat([...chat]);
    });
    setsock(socket);

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, []);

  const sendMessage = async () => {
    // Send the message to the server
    sock.emit('message', currentMessage);
    console.log(currentMessage);
    await GptHelper.checkProfanity(currentMessage);
    // Clear the currentMessage state
    setCurrentMessage('');
  };

  return (
    <div>
      {/* Display the messages */}
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}

      {/* Input field for sending new messages */}
      <input
        type="text"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
      />

      <li>
        {chat.map((el) => (
          <li>{el}</li>
        ))}
      </li>

      {/* Button to submit the new message */}
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
