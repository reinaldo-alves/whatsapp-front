import { useEffect, useRef, useState } from 'react';
import './App.css';
import Image from './assets/profissao-programador.jpg'
import SendMessageIcon from './assets/send.png'
import socket from 'socket.io-client';
import EnterName from './components/EnterName/EnterName';

const io = socket('http://localhost:4000')

interface IUser {
  id: string,
  name: string
}

interface IMessage {
  name: string
  message: string
}

function App() {
  const [name, setName] = useState("");
  const [joined, setJoined] =useState(false);
  const [users, setUsers] =useState([]);
  const [message, setMessage] =useState("");
  const [messages, setMessages] =useState([] as Array<IMessage>);

  useEffect(() => {
    io.on("users", (users) => setUsers(users));
  }, [])

  const messagesArea = useRef<HTMLDivElement>(null);

  useEffect(() => {
    io.on("message", (message) => setMessages([...messages, message]))
    if (messagesArea.current) {
      messagesArea.current.scrollBy(0, window.innerHeight);
    }
  }, [messages])
  
  const handleJoin = () => {
    if(name){
      io.emit("join", name);
      setJoined(true);
    }
  }

  const handleMessage = () => {
    if(message){
      io.emit("message", {message, name})
      setMessage("")
    }
  }

  if(!joined){
    return (
      <EnterName 
        name={name}
        change={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        handle={() => handleJoin()}
      />
    )
  }

  return (
    <div className="container">
      <div className="back-ground"></div>
      <div className="chat-container">
        
        <div className="chat-contacts">
          <div className="chat-options"></div>
          <div className="chat-item">
            <img src={Image} className="image-profile" alt="" />
            <div className="title-chat-container">
              <span className="title-message">Networking Profissão Programador</span>
              <span className="last-message">
                {messages.length? `${messages[messages.length - 1].name}: ${messages[messages.length - 1].message}` : ''}
              </span>
            </div>
          </div>
        </div>
      
        <div className="chat-messages">
          <div className="chat-options">
            <div className="chat-item">
              <img src={Image} className="image-profile" alt="" />
              <div className="title-chat-container">
                <span className="title-message">Networking Profissão Programador</span>
                <span className="last-message">
                  {users.map((user: IUser, index) => (
                    <span>{user.name}{index + 1 < users.length? ', ' : ''}</span>
                  ))} 
                </span>
              </div>
            </div>
          </div>

          <div className="chat-messages-area" ref={messagesArea}>
              {messages.map((message: IMessage, index) => (
                <div className={!message.name? 'user-container-message center' : message.name===name? 'user-container-message right' : 'user-container-message left'}>
                  <span
                    key={index}
                    className={!message.name? 'system-message' : message.name===name? 'user-my-message' : 'user-other-message'}
                  >
                    {message.name? `${message.name}: ` : ''}{message.message}
                  </span>
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
