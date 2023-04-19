import { useEffect, useRef, useState } from 'react';
import './App.css';
import Image from './assets/profissao-programador.jpg';
import SendMessageIcon from './assets/send.png';
import NewGroup from './assets/add-group.png';
import NewChat from './assets/new-message.png';
import socket from 'socket.io-client';
import { IUser, IMessage } from './types/types';
import EnterName from './components/EnterName/EnterName';

const io = socket('http://localhost:4000')

function App() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [joined, setJoined] =useState(false);
  const [user, setUser] =useState({} as IUser);
  const [users, setUsers] =useState([]);
  const [message, setMessage] =useState("");
  const [messages, setMessages] =useState([] as Array<IMessage>);

  const messagesArea = useRef<HTMLDivElement>(null);

  const date = new Date()
  const hourMessage = date.toLocaleTimeString('pt-BR', {timeStyle: 'short'});

  const colors = ['red', 'blue', 'pink', 'green', 'gray', 'orange', 'brown']

  function selectRandom(array:Array<any>) {
    const index = Math.floor(Math.random() * array.length);
    const random = array[index];
    return random
  }

  useEffect(() => {
    io.on("users", (users, user) => {
      setUsers(users);
      console.log(user);
    });
  }, [])

  useEffect(() => {
    io.on("message", (message) => setMessages([...messages, message]))
    if (messagesArea.current) {
      messagesArea.current.scrollBy(0, window.innerHeight);
    }
  }, [messages])
  
  const handleJoin = () => {
    if(name){
      const color = selectRandom(colors)
      io.emit("join", name, avatar, color);
      setUser({id:'', name: name, avatar: avatar, color: color});
      setJoined(true);
    }
  }

  const handleMessage = () => {
    if(message){
      io.emit("message", {user: user, message: message, hour: hourMessage})
      setMessage("")
    }
  }

  if(!joined){
    return (
      <EnterName 
        name={name}
        avatar={avatar}
        changename={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        changeavatar={(e: React.ChangeEvent<HTMLInputElement>) => setAvatar(e.target.value)}
        handle={() => handleJoin()}
      />
    )
  }

  console.log(user)

  return (
    <div className="container">
      <div className="back-ground"></div>
      <div className="chat-container">
        
        <div className="chat-contacts">
          <div className="chat-options">
            <img src={avatar} className="image-profile" alt="" />
            <div className="options-container">
              <img src={NewChat} className="image-option" alt="" />
              <img src={NewGroup} className="image-option" alt="" />
            </div>
          </div>

          <div className="chat-item">
            <img src={Image} className="image-profile" alt="" />
            <div className="title-chat-container">
              <span className="title-message">Networking Profissão Programador</span>
              <span className="last-message">
                {!messages.length? '' : 
                  messages[messages.length - 1].user.name? `${messages[messages.length - 1].user.name}: ${messages[messages.length - 1].message}` :
                  messages[messages.length - 1].message
                }
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
                <div className={!message.user.name? 'user-container-message center' : message.user.name===name? 'user-container-message right' : 'user-container-message left'}>
                  <div
                    key={index}
                    className={!message.user.name? 'system-message' : message.user.name===name? 'user-my-message' : 'user-other-message'}
                  >
                    {message.user.name? 
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
