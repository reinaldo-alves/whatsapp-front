import { useContext, useEffect, useRef, useState } from 'react';
import './App.css';
import Image from './assets/profissao-programador.jpg';
import SendMessageIcon from './assets/send.png';
import socket from 'socket.io-client';
import { IUser, IMessage, IRoom } from './types/types';
import { MessageContext } from './contexts/MessageContext';
import { UserContext } from './contexts/UserContext';
import EnterName from './components/EnterName/EnterName';
import ChatItem from './components/ChatItem/ChatItem';
import ChatOptions from './components/ChatOptions/ChatOptions';

const io = socket('http://localhost:4000')

function App() {
  const [message, setMessage] =useState("");

  const { messages, setMessages, rooms, setRooms } = useContext(MessageContext);
  const {user, id, joined, users, setUsers} = useContext(UserContext);

  const messagesArea = useRef<HTMLDivElement>(null);

  const date = new Date()
  const hourMessage = date.toLocaleTimeString('pt-BR', {timeStyle: 'short'});

  useEffect(() => {
    io.on("users", (users) => {
      setUsers(users);
    });
    io.on("rooms", (rooms) => setRooms(rooms));
  }, [])

  console.log(user)
  console.log(users)

  useEffect(() => {
    io.on("message", (message) => setMessages([...messages, message]))
    if (messagesArea.current) {
      messagesArea.current.scrollBy(0, window.innerHeight);
    }
  }, [messages])

  const handleMessage = () => {
    if(message){
      io.emit("message", {user: user, message: message, hour: hourMessage})
      setMessage("")
    }
  }

  if(!joined){
    return (
      <EnterName />
    )
  }

  return (
    <div className="container">
      <div className="back-ground"></div>
      <div className="chat-container">
        
        <div className="chat-contacts">
          <ChatOptions />
          <ChatItem name={'Networking Profissão Programador'} avatar={Image} messages={messages} />
          {rooms.map((item: IRoom) => (
            <ChatItem name={item.name} avatar={item.avatar} messages={item.messages} />
          ))}
        </div>
      
        <div className="chat-messages">
          <div className="chat-options">
            <div className="chat-item">
              <img src={Image} className="image-profile" alt="" />
              <div className="title-chat-container">
                <span className="title-message">Networking Profissão Programador</span>
                <span className="last-message">
                  {users.map((user: IUser, index: number) => (
                    <span>{user.name}{index + 1 < users.length? ', ' : ''}</span>
                  ))} 
                </span>
              </div>
            </div>
          </div>

          <div className="chat-messages-area" ref={messagesArea}>
              {messages.map((message: IMessage, index: number) => (
                <div className={!message.user.id? 'user-container-message center' : message.user.id===id? 'user-container-message right' : 'user-container-message left'}>
                  <div
                    key={index}
                    className={!message.user.id? 'system-message' : message.user.id===id? 'user-my-message' : 'user-other-message'}
                  >
                    {message.user.id? 
                      <div className='message-container'>
                        <span style={{color: message.user.color}} className='message-name'>{message.user.name}</span>
                        <span className='message-message'>{message.message}</span>
                        <span className='message-hour'>{message.hour}</span>
                      </div>
                    :
                      <span>{message.message}</span>
                    }
                  </div>
                </div>
              ))}
          </div>

          <div className="chat-input-area">
            <input
              className="chat-input"
              placeholder="Mensagem"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <img src={SendMessageIcon} alt="" className="send-message-icon" onClick={() => handleMessage()}/>
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
