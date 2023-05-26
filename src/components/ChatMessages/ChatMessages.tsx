import { useContext, useRef, useState, useEffect } from 'react'
import socket from 'socket.io-client';
import SendMessageIcon from '../../assets/send.png';
import NewMember from '../../assets/novo-usuario.png';
import LogOutIcon from '../../assets/log-out.png';
import { IMessage, IRoom, IUser } from '../../types/types';
import { UserContext } from '../../contexts/UserContext';
import { ButtonsContainer, ChatInputArea, ChatMessagesArea, Dropdown, DropdownTitle, GroupMembers, HeaderContainer, ImageProfile, InfoChatContainer, MenuItem, MessageBaloon, MessageContainer, MessageHour, MessageMessage, MessageName, MessagesPosition, OptionsButton, OptionsContainer, Overlay, TitleChat, TitleChatContainer } from './styles';
import { MessageContext } from '../../contexts/MessageContext';
import { updateMessages } from '../../utilities/functions';

const io = socket('http://localhost:4000')

interface IProps {
  room: IRoom
}

function ChatMessages(props: IProps) {
  const { user, otherUsers, setOtherUsers, users } = useContext(UserContext);
  const { allMessages, setAllMessages, activator, setActivator, myRooms, activeRoom, setActiveRoom } = useContext(MessageContext);

  const [message, setMessage] = useState("");
  const [dropList, setDropList] = useState(false);

  const messagesArea = useRef<HTMLDivElement>(null);

  const renderMessages = allMessages[props.room.roomname] || []

  const [groupUsers] = myRooms.filter((item: IRoom) => item.roomname === props.room.roomname)

  const date = new Date()
  const hourMessage = date.toLocaleTimeString('pt-BR', {timeStyle: 'short'});

  const handleMessage = () => {
    if(message){
      io.emit("message", {user: user, message: message, hour: hourMessage}, props.room)
      setMessage("")
    }
  }

  const handleMessageByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleMessage()
      setActivator(!activator)
    }
  }

  const quitGroup = () => {
    io.emit("exitgroup", user, activeRoom);
    alert(`Você saiu do grupo ${activeRoom.name}`)
    setActiveRoom({name: '', avatar: '', users: [], messages: [], group: true, roomname: ''});
  }

  function handleNewMember(newMember: IUser) {
    io.emit("adduser", newMember, props.room);
    setDropList(false);
  }

  useEffect(() => {
    io.on("message", (message, roomName) => setAllMessages(() => updateMessages(allMessages, message, roomName)))
    if (messagesArea.current) {
      messagesArea.current.scrollBy(0, window.innerHeight);
    }
  }, [allMessages, activator])

  return(
    <>
      <HeaderContainer>
        <InfoChatContainer>
          <ImageProfile src={props.room.avatar} alt="" />
          <TitleChatContainer>
            <TitleChat>{props.room.name}</TitleChat>
            <GroupMembers>
              {!props.room.group? '' : 
              groupUsers.users.map((user: IUser, index: number) => (
                <span>{user.name}{index + 1 < groupUsers.users.length? ', ' : ''}</span>
                ))} 
            </GroupMembers>
          </TitleChatContainer>
        </InfoChatContainer>
        <ButtonsContainer>
          {props.room.group?
            <OptionsContainer>
              <OptionsButton src={NewMember} onClick={() => {
                setDropList(!dropList)
                setOtherUsers(users.filter((item: IUser) => item.email !== user.email))
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
              <OptionsButton
                src={LogOutIcon}
                alt=""
                onClick={quitGroup}
              />
            </OptionsContainer>
          : <div></div>}
        </ButtonsContainer>
      </HeaderContainer>

      <ChatMessagesArea ref={messagesArea}>
          {renderMessages.map((message: IMessage, index: number) => (
            <MessagesPosition system={!message.user.email} myMessage={message.user.email===user.email}>
              <MessageBaloon system={!message.user.email} myMessage={message.user.email===user.email}>
                {message.user.email? 
                  <MessageContainer>
                    {props.room.group? <MessageName color={message.user.color}>{message.user.name}</MessageName> : ''}
                    <MessageMessage>{message.message}</MessageMessage>
                    <MessageHour>{message.hour}</MessageHour>
                  </MessageContainer>
                :
                <span>{message.message}</span>
                }
              </MessageBaloon>
            </MessagesPosition>
          ))}
      </ChatMessagesArea> 

      <ChatInputArea>
            <input
              type='text'
              onKeyUp={handleMessageByEnter}
              placeholder="Mensagem"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <img src={SendMessageIcon} alt="" onClick={() => {
              handleMessage()
              setActivator(!activator)
            }}/>
      </ChatInputArea>

    </> 
  )
}

export default ChatMessages