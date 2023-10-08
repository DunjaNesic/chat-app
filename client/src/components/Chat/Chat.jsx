import React, { useEffect, useState } from 'react'
import './Chat.css'
import queryString from 'query-string';
import io from 'socket.io-client'
import { useLocation, useNavigate } from 'react-router-dom';
import Infobar from '../Infobar/Infobar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';
import { Navigate } from "react-router-dom";

let socket;

function Chat() {

  const location = useLocation();

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState('');
  const ENDPOINT = 'localhost:5000';
  
  const navigate = useNavigate();

  useEffect(()=>{
    const {name, room} = queryString.parse(location.search);

    socket = io(ENDPOINT, { transports : ['websocket'] });

    setName(name);
    setRoom(room);

    //nisam bas sig da je pametno da emitujem u useEffect-u al radi hahah
    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error)
        navigate('/');
      }
    });

    //ne znam uopste da zakljucim kad ovo treba
     return () => {
       socket.disconnect();
     }

  }, [ENDPOINT, location.search])

    //hvala stelje 
     useEffect(()=>{
       socket.on('message', (message)=>{
         setMessages((prevMessages)=>[...prevMessages, message])
       })
       console.log(messages);
       socket.on("roomData", ({ users }) => {
             setUsers(users);
          });
     },[])

      //moze i ovako
      // useEffect(() => {
      //   socket.on("message", (message) => {
      //     setMessages([...messages, message]);
      //   });
      //   socket.on("roomData", ({ users }) => {
      //     setUsers(users);
      //   });
      // }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, ()=>setMessage(''))
    }
  }

  return (
    <div className='outerContainer'>
      <div className='container'>
        <Infobar room = {room}/>
        <Messages messages={messages}
        name={name}/>
        <Input message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}/>
      </div>
      <TextContainer users = {users}/>
    </div>
  )
}

export default Chat