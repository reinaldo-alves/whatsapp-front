import { useContext, useEffect, useRef, useState } from 'react'
import NewChat from '../../assets/new-message.png';
import NewGroup from '../../assets/add-group.png';
import socket from 'socket.io-client';
import { UserContext } from '../../contexts/UserContext';
import { Dropdown, DropdownTitle, GroupButton, GroupInput, GroupLabel, OptionsButton, OptionsContainer, Overlay, MenuItem, UserName, ImageProfile, HeaderContainer, GroupContainer, NoUserMessage } from './styles';
import { IRoom, IUser } from '../../types/types';
import { MessageContext } from '../../contexts/MessageContext';
import { roomExists, updateMessages } from '../../utilities/functions';

const io = socket('http://localhost:4000')

function ChatOptions() {
    const { rooms, myRooms, setActiveRoom, setNewRoom } = useContext(MessageContext);
    const { user, users, otherUsers, setOtherUsers } = useContext(UserContext);
    const { allMessages, setAllMessages } = useContext(MessageContext);
    const [dropChat, setDropChat] = useState(false);
    const [dropGroup, setDropGroup] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [roomAvatar, setRoomAvatar] = useState('');

    const groupInputRef = useRef<HTMLInputElement>(null);

    const handleNewGroup = () => {
      const exists = roomExists(rooms, roomName)
      if (!exists) {
        io.emit("newgroup", roomName, roomAvatar? roomAvatar : 'https://www.shareicon.net/data/512x512/2016/06/30/788858_group_512x512.png', user.email);
        setAllMessages(() => updateMessages(allMessages, {user: {id:'', email: '', name:'', avatar: '', password: '', color:'', online: true}, message: `Grupo ${roomName} criado`, hour: ''}, roomName))
        setNewRoom(true);
        setDropGroup(false);
      } else {
        alert('Já existe um grupo com este nome. Por favor, escolha outro nome');
        setRoomName('');
      }
    }

    function handleNewChat(receiver: IUser) {
      const exists1 = roomExists(rooms, user.email.concat(receiver.email));
      const exists2 = roomExists(rooms, receiver.email.concat(user.email));
      if (receiver.online) {
        if(!exists1 && !exists2) {
          io.emit("newchat", receiver, user);
          setAllMessages(() => updateMessages(allMessages, {user: {id:'', email: '', name:'', avatar: '', password: '', color:'', online: true}, message: 'Conversa iniciada', hour: ''}, user.id.concat(receiver.id)))
          setNewRoom(true);
          setDropChat(false);
        } else {
          alert('Esta conversa já foi iniciada. Você será redirecionado para ela');
          setActiveRoom(myRooms.find((item: IRoom) => item.roomname === receiver.email.concat(user.email) || item.roomname === user.email.concat(receiver.email)))
          setDropChat(false);
        }
      } else {
        alert(`${receiver.name} está offline. Tente novamente mais tarde`)
      }
    }

    useEffect(() => {
      if (dropGroup && groupInputRef.current) {
        groupInputRef.current.focus();
      }
    }, [dropGroup, groupInputRef]);

    return(
      <HeaderContainer>
        <ImageProfile src={user.avatar? user.avatar : 'https://img.freepik.com/vetores-premium/icone-de-perfil-de-avatar_188544-4755.jpg?w=2000'} alt="" />
        <UserName>{user.name}</UserName>
        <OptionsContainer>
          <OptionsButton 
            src={NewChat}
            alt=""
            onClick={() => {
              setDropChat(!dropChat)
              setDropGroup(false)
              setOtherUsers(users.filter((item: IUser) => item.email !== user.email))
            }}
          />
            <Dropdown dropdown={dropChat} onClick={() => setDropChat(false)}>
              <ul>
                <DropdownTitle>Escolha um usuário para conversar</DropdownTitle>
                {otherUsers.length===0 ? <NoUserMessage>Nenhum usuário conectado</NoUserMessage> : ''}
                {[...otherUsers]
                  .sort((a: IUser, b: IUser) => {
                    const nomeA = a.name.toUpperCase();
                    const nomeB = b.name.toUpperCase();
                    if (nomeA < nomeB) return -1;
                    if (nomeA > nomeB) return 1;
                    return 0
                  })
                  .map((item: IUser) => (
                    <li>
                      <MenuItem onClick={() => handleNewChat(item)} online={item.online}>
                          <img alt="" src={item.avatar} />
                          <span>{item.online? item.name : `${item.name} (offline)`}</span>
                      </MenuItem>
                    </li>
                ))}
              </ul>
            </Dropdown>
            <Overlay dropdown={dropGroup} onClick={() => setDropGroup(false)}/>
          <OptionsButton
            src={NewGroup}
            alt=""
            onClick={() => {
              setDropGroup(!dropGroup)
              setDropChat(false)
              setRoomName('')
              setRoomAvatar('')
              if (groupInputRef.current) {groupInputRef.current.focus()}
            }}
          />
            <Dropdown dropdown={dropGroup}>
              <ul>
                <DropdownTitle>Insira as informações do novo grupo</DropdownTitle>
                <GroupContainer>
                  <GroupLabel>Nome do grupo</GroupLabel>
                  <GroupInput
                    ref={groupInputRef}
                    value={roomName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomName(e.target.value)}
                    onKeyUp={(e) => {if (e.key === 'Enter') {handleNewGroup()}}}
                  />
                  <GroupLabel>Imagem do grupo</GroupLabel>
                  <GroupInput
                    value={roomAvatar}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomAvatar(e.target.value)}
                    onKeyUp={(e) => {if (e.key === 'Enter') {handleNewGroup()}}}
                  />
                  <GroupButton onClick={handleNewGroup} >Criar Grupo</GroupButton>
                </GroupContainer>
              </ul>
            </Dropdown>
            <Overlay dropdown={dropChat} onClick={() => setDropChat(false)}/>
        </OptionsContainer>
      </HeaderContainer>
    )
}

export default ChatOptions