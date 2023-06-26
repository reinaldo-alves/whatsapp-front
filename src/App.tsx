import { useContext, useEffect, useRef, useState } from 'react';
import './App.css';
import socket from 'socket.io-client';
import { IRoom, IUser } from './types/types';
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
  let roomsFromServer = [] as Array<IRoom>;

  const { allMessages, setAllMessages, rooms, setRooms, activeRoom, setActiveRoom, myRooms, setMyRooms, activator, setActivator, counter, setCounter, fixed, messageInputRef, newRoom, setNewRoom } = useContext(MessageContext);
  const {user, joined, users, setUsers, showMenu, setShowMenu} = useContext(UserContext);

  const [counterRoomName, setCounterRoomName] = useState('');

  const messagesArea = useRef<HTMLDivElement>(null);

  function updateArray(arrayServ: Array<IRoom>, arrayCli: Array<IRoom>) {
    for (let i = 0; i < arrayServ.length; i++) {
      const elServ = arrayServ[i];
      const elCli = arrayCli.find(item => item.roomname === elServ.roomname);
      if (elCli) {
        Object.assign(elCli, elServ);
      } else {
        arrayCli.unshift(elServ);
      }
    }
    return arrayCli
  }

  useEffect(() => {
    io.on("users", (users) => setUsers(users));
    io.on("rooms", (rooms) => setRooms(rooms));
  }, [])
  
  useEffect(() => {
    io.on("messageAlert", (user, on_off) => {
      if(joined) {
        alert(`${user.name} está ${on_off ? 'online' : 'offline'}`)
      }
    });
  }, [users])

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
    roomsFromServer = updateArray(rooms, myRooms)
    roomsFromServer.forEach((item: IRoom, index: number) => {
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
      if (newRoom) {
        setActiveRoom(myRooms[0]);
        setNewRoom(false);
      }
    })
  }, [myRooms])

  useEffect(() => {
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  }, [messageInputRef, activeRoom]);

  if(!joined){
    return (
      <EnterName />
    )
  }

  return (
    <div className="container">
      <div className="back-ground"></div>
      <div className="chat-container">
        
        <div className={`${showMenu? 'chat-contacts' : 'chat-contacts hidden'}`}>
          <ChatOptions />
          <div className="chat-items-container">
            {fixed.roomname? 
              <ChatItem onClick={() => {
                setActiveRoom(fixed);
                setCounter(() => restartCounter(counter, fixed.roomname));
                io.emit("joinroom", fixed.roomname);
                setActivator(!activator);
                if(messageInputRef.current) {messageInputRef.current.focus()};
                if(!fixed.group && !fixed.users.filter((el: IUser) => el.email !== user.email)[0].online) {
                  alert(`${fixed.users.filter((el: IUser) => el.email !== user.email)[0].name} está offline e não receberá as mensagem que você enviar agora`)
                }
              }} name={fixed.name} avatar={fixed.avatar} active={activeRoom.roomname === fixed.roomname} counter={counter[fixed.roomname]} fixed={true} messages={allMessages[fixed.roomname] || []} /> 
            : ''}
            {myRooms.filter((el: IRoom) => el.roomname !== fixed.roomname).map((item: IRoom, index: number) => (
              <ChatItem key={index} onClick={() => {
                setActiveRoom(item);
                setShowMenu(false);
                setCounter(() => restartCounter(counter, item.roomname));
                io.emit("joinroom", item.roomname);
                setActivator(!activator);
                if(messageInputRef.current) {messageInputRef.current.focus()};
                if(!item.group && !item.users.filter((el: IUser) => el.email !== user.email)[0].online) {
                  alert(`${item.users.filter((el: IUser) => el.email !== user.email)[0].name} está offline e não receberá as mensagem que você enviar agora`)
                }
              }} name={item.name} avatar={item.avatar} active={activeRoom.roomname === item.roomname} counter={counter[item.roomname]} fixed={false} messages={allMessages[item.roomname] || []} />
            ))}
          </div>
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
