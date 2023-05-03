import { useContext, useState } from 'react'
import NewChat from '../../assets/new-message.png';
import NewGroup from '../../assets/add-group.png';
import LogOutIcon from '../../assets/log-out.png';
import socket from 'socket.io-client';
import { UserContext } from '../../contexts/UserContext';
import { Dropdown, DropdownTitle, GroupButton, GroupInput, GroupLabel, OptionsButton, OptionsContainer, Overlay, MenuItem, UserName, ImageProfile, HeaderContainer, GroupContainer, NoUserMessage } from './styles';
import { IUser } from '../../types/types';
import { MessageContext } from '../../contexts/MessageContext';
import { updateMessages } from '../../utilities/functions';

const io = socket('http://localhost:4000')

function ChatOptions() {
    const { id, user, name, avatar, setJoined, users, otherUsers, setOtherUsers } = useContext(UserContext);
    const { allMessages, setAllMessages } = useContext(MessageContext);
    const [dropChat, setDropChat] = useState(false);
    const [dropGroup, setDropGroup] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [roomAvatar, setRoomAvatar] = useState('');
   
    const logOut = () => {
      io.emit("logout", user);
      setJoined(false);
    }

    const handleNewGroup = () => {
      io.emit("newgroup", roomName, roomAvatar? roomAvatar : 'https://www.shareicon.net/data/512x512/2016/06/30/788858_group_512x512.png', id);
      setAllMessages(() => updateMessages(allMessages, {user: {id:'', name:'', avatar: '', color:''}, message: `Grupo ${roomName} criado`, hour: ''}, roomName))
      setDropGroup(false);
    }

    function handleNewChat(receiver: IUser) {
      io.emit("newchat", receiver, user);
      setAllMessages(() => updateMessages(allMessages, {user: {id:'', name:'', avatar: '', color:''}, message: 'Conversa iniciada', hour: ''}, user.id.concat(receiver.id)))
      setDropChat(false);
    }

    return(
      <HeaderContainer>
        <ImageProfile src={avatar? avatar : 'https://img.freepik.com/vetores-premium/icone-de-perfil-de-avatar_188544-4755.jpg?w=2000'} alt="" />
        <UserName>{name}</UserName>
        <OptionsContainer>
          <OptionsButton 
            src={NewChat}
            alt=""
            onClick={() => {
              setDropChat(!dropChat)
              setDropGroup(false)
              setOtherUsers(users.filter((item: IUser) => item.id !== id))
            }}
          />
            <Dropdown dropdown={dropChat} onClick={() => setDropChat(false)}>
              <ul>
                <DropdownTitle>Escolha um usuário para conversar</DropdownTitle>
                {otherUsers.length===0 ? <NoUserMessage>Nenhum usuário conectado</NoUserMessage> : ''}
                {otherUsers.map((item: IUser) => (
                  <li>
                    <MenuItem onClick={() => handleNewChat(item)}>
                        <img alt="" src={item.avatar} />
                        <span>{item.name}</span>
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
            }}
          />
            <Dropdown dropdown={dropGroup}>
              <ul>
                <DropdownTitle>Insira as informações do novo grupo</DropdownTitle>
                <GroupContainer>
                  <GroupLabel>Nome do grupo</GroupLabel>
                  <GroupInput value={roomName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomName(e.target.value)} />
                  <GroupLabel>Imagem do grupo</GroupLabel>
                  <GroupInput value={roomAvatar} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomAvatar(e.target.value)}/>
                  <GroupButton onClick={handleNewGroup} >Criar Grupo</GroupButton>
                </GroupContainer>
              </ul>
            </Dropdown>
            <Overlay dropdown={dropChat} onClick={() => setDropChat(false)}/>
          <OptionsButton
            src={LogOutIcon}
            alt=""
            onClick={logOut}
          />
        </OptionsContainer>
      </HeaderContainer>
    )
}

export default ChatOptions