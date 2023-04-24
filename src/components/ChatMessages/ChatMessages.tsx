import { useContext, useRef, useState } from 'react'
import socket from 'socket.io-client';
import SendMessageIcon from '../../assets/send.png';
import NewMember from '../../assets/novo-usuario.png';
import { IMessage, IRoom, IUser } from '../../types/types';
import { UserContext } from '../../contexts/UserContext';
import { ButtonsContainer, Dropdown, DropdownTitle, MenuItem, OptionsButton, Overlay } from './styles';
import { MessageContext } from '../../contexts/MessageContext';

const io = socket('http://localhost:4000')

interface IProps {
  room: IRoom
}

function ChatMessages(props: IProps) {
  const { id, user, otherUsers, setOtherUsers, users } = useContext(UserContext);
  const { room } = useContext(MessageContext);

  const [message, setMessage] = useState("");
  const [dropList, setDropList] = useState(false);

  const messagesArea = useRef<HTMLDivElement>(null);

  const date = new Date()
  const hourMessage = date.toLocaleTimeString('pt-BR', {timeStyle: 'short'});

  const handleMessage = () => {
    if(message){
      io.emit("message", {user: user, message: message, hour: hourMessage}, props.room.roomname)
      setMessage("")
    }
  }

  function handleNewMember(newMember: IUser) {
    console.log(newMember);
    io.emit("adduser", newMember, room);
    setDropList(false);
  }

  return(
    <>
      <div className="chat-options">
        <div className="chat-item">
          <img src={props.room.avatar} className="image-profile" alt="" />
          <div className="title-chat-container">
            <span className="title-message">{props.room.name}</span>
            <span className="last-message">
              {!props.room.group? '' : 
              props.room.users.map((user: IUser, index: number) => (
                <span>{user.name}{index + 1 < props.room.users.length? ', ' : ''}</span>
              ))} 
            </span>
          </div>
        </div>
        <ButtonsContainer>
          {props.room.group?
            <>
              <OptionsButton src={NewMember} onClick={() => {
                setDropList(!dropList)
                setOtherUsers(users.filter((item: IUser) => item.id !== id))
              }} />
              <Dropdown dropdown={dropList} onClick={() => setDropList(false)}>
                <ul>
                  <DropdownTitle>Adicione um usuário no grupo</DropdownTitle>
                  {otherUsers.length===0?
                    <span style={{display: 'block', width: '100%', textAlign: 'center'}}>
                      Nenhum usuário conectado
                    </span>
                  : ''}
                  {otherUsers.map((item: IUser) => (
                    <li>
                      <MenuItem onClick={() => handleNewMember(item)}>
                          <img alt="" src={item.avatar} />
                          <span>{item.name}</span>
                      </MenuItem>
                    </li>
                  ))}
                </ul>
              </Dropdown>
              <Overlay dropdown={dropList} onClick={() => setDropList(false)}/>
            </>
          : <div></div>}
        </ButtonsContainer>
      </div>

      <div className="chat-messages-area" ref={messagesArea}>
          {props.room.messages.map((message: IMessage, index: number) => (
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

    </> 
  )
}

export default ChatMessages