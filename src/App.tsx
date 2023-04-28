import { useContext, useEffect, useRef } from 'react';
import './App.css';
import Image from './assets/profissao-programador.jpg';
import socket from 'socket.io-client';
import { IRoom } from './types/types';
import { MessageContext } from './contexts/MessageContext';
import { UserContext } from './contexts/UserContext';
import EnterName from './components/EnterName/EnterName';
import ChatItem from './components/ChatItem/ChatItem';
import ChatOptions from './components/ChatOptions/ChatOptions';
import ChatMessages from './components/ChatMessages/ChatMessages';
import HomePage from './components/HomePage/HomePage';
import { cutString, isInArray, updateMessages } from './utilities/functions';

const io = socket('http://localhost:4000')

function App() {
  let updatedMyRooms = [] as Array<IRoom>;

  const { allMessages, setAllMessages, rooms, setRooms, activeRoom, setActiveRoom, myRooms, setMyRooms, activator, setActivator } = useContext(MessageContext);
  const {user, id, joined, setUsers} = useContext(UserContext);

  const messagesArea = useRef<HTMLDivElement>(null);

  useEffect(() => {
    io.on("users", (users) => {
      setUsers(users);
    });
    io.on("rooms", (rooms) => setRooms(rooms));
  }, [])

  useEffect(() => {
    io.on("message", (message, roomName) => setAllMessages(() => updateMessages(allMessages, message, roomName)))
    if (messagesArea.current) {
      messagesArea.current.scrollBy(0, window.innerHeight);
    }
  }, [allMessages])

  useEffect(() => {
    io.on("rooms", (rooms) => setRooms(rooms))
    rooms.map((item: IRoom, index: number) => {
      if(!item.group) {
        updatedMyRooms[index] = {
          name: cutString(item.name, user.name),
          avatar: cutString(item.avatar, user.avatar),
          users: item.users,
          messages: item.messages,
          group: item.group,
          roomname: item.roomname
        }
      } else {
        updatedMyRooms[index] = {
          name: item.name,
          avatar: item.avatar,
          users: item.users,
          messages: item.messages,
          group: item.group,
          roomname: item.roomname
        }
      }
    })
    setMyRooms(updatedMyRooms.filter((item: IRoom) => isInArray(item.users, id) === true))
  }, [rooms])

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
          {myRooms.map((item: IRoom) => (
            <ChatItem onClick={() => {
              setActiveRoom(item);
              io.emit("joinroom", item.roomname);
              setActivator(!activator);
            }} name={item.name} avatar={item.avatar} messages={allMessages[item.roomname] || []} />
          ))}
        </div>
      
        <div className="chat-messages">
          {!activeRoom.roomname?
            <HomePage />
          :
            <ChatMessages room={activeRoom} />
          }
          {/* <div className="chat-options">
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
          </div> */}

        </div>

      </div>
    </div>
  );
}

export default App;
