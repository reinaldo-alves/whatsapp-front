import { useContext, useEffect, useRef, useState } from 'react';
import './App.css';
import socket from 'socket.io-client';
import { IRoom } from './types/types';
import { MessageContext } from './contexts/MessageContext';
import { UserContext } from './contexts/UserContext';
import EnterName from './components/EnterName/EnterName';
import ChatItem from './components/ChatItem/ChatItem';
import ChatOptions from './components/ChatOptions/ChatOptions';
import ChatMessages from './components/ChatMessages/ChatMessages';
import HomePage from './components/HomePage/HomePage';
import { cutString, isInArray, reorderRooms, restartCounter, updateCounter, updateMessages } from './utilities/functions';

const io = socket('http://localhost:4000')

function App() {
  let updatedMyRooms = [] as Array<IRoom>;

  const { allMessages, setAllMessages, rooms, setRooms, activeRoom, setActiveRoom, myRooms, setMyRooms, activator, setActivator, counter, setCounter, fixed } = useContext(MessageContext);
  const {user, joined, setUsers} = useContext(UserContext);

  const [counterRoomName, setCounterRoomName] = useState('');

  const messagesArea = useRef<HTMLDivElement>(null);

  useEffect(() => {
    io.on("users", (users) => setUsers(users));
    io.on("rooms", (rooms) => setRooms(rooms));
  }, [])

  useEffect(() => {
    io.on("message", (message, roomName) => {
      setAllMessages(() => updateMessages(allMessages, message, roomName))
      setCounterRoomName(roomName)
    })
    if (messagesArea.current) {
      messagesArea.current.scrollBy(0, window.innerHeight);
    }
    setCounter(() => updateCounter(counter, counterRoomName, activeRoom))
    setMyRooms(reorderRooms(myRooms, counterRoomName));
  }, [allMessages])

  useEffect(() => {
    io.on("rooms", (rooms) => setRooms(rooms))
    rooms.forEach((item: IRoom, index: number) => {
      if(!item.group) {
        updatedMyRooms[index] = {
          name: cutString(item.name, user.name || ''),
          avatar: cutString(item.avatar, user.avatar || ''),
          users: item.users,
          group: item.group,
          roomname: item.roomname
        }
      } else {
        updatedMyRooms[index] = {
          name: item.name,
          avatar: item.avatar,
          users: item.users,
          group: item.group,
          roomname: item.roomname
        }
      }
    })
    setMyRooms(updatedMyRooms.filter((item: IRoom) => isInArray(item.users, user.email) === true))
  }, [rooms, joined])

  useEffect(() => {
    myRooms.forEach((item: IRoom) => {
      io.emit("joinroom", item.roomname);
    })
  }, [myRooms])

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
          {fixed.roomname? 
            <ChatItem onClick={() => {
              setActiveRoom(fixed);
              setCounter(() => restartCounter(counter, fixed.roomname));
              io.emit("joinroom", fixed.roomname);
              setActivator(!activator);
            }} name={fixed.name} avatar={fixed.avatar} counter={counter[fixed.roomname]} fixed={true} messages={allMessages[fixed.roomname] || []} /> 
          : ''}
          {myRooms.filter((el: IRoom) => el.roomname !== fixed.roomname).map((item: IRoom) => (
            <ChatItem onClick={() => {
              setActiveRoom(item);
              setCounter(() => restartCounter(counter, item.roomname));
              io.emit("joinroom", item.roomname);
              setActivator(!activator);
            }} name={item.name} avatar={item.avatar} counter={counter[item.roomname]} fixed={false} messages={allMessages[item.roomname] || []} />
          ))}
        </div>
      
        <div className="chat-messages">
          {!activeRoom.roomname?
            <HomePage />
          :
            <ChatMessages room={activeRoom} />
          }
        </div>

      </div>
    </div>
  );
}

export default App;
