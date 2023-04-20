import { useContext, useState } from 'react'
import NewChat from '../../assets/new-message.png';
import NewGroup from '../../assets/add-group.png';
import LogOutIcon from '../../assets/log-out.png';
import socket from 'socket.io-client';
import { UserContext } from '../../contexts/UserContext';
import { Dropdown, DropdownTitle, GroupButton, GroupInput, GroupLabel, OptionsButton, OptionsContainer, Overlay, MenuItem } from './styles';
import { IUser } from '../../types/types';

const io = socket('http://localhost:4000')

function ChatOptions() {
    const { name, avatar, setJoined, users } = useContext(UserContext);
    const [dropChat, setDropChat] = useState(false);
    const [dropGroup, setDropGroup] = useState(false);
    const [otherUsers, setOtherUsers] = useState([] as Array<IUser>);
    const [roomName, setRoomName] = useState('');
    const [roomAvatar, setRoomAvatar] = useState('');
   
    const logOut = () => {
      io.emit("logout", name);
      setJoined(false);
    }

    const handleNewGroup = () => {
      io.emit("newgroup", roomName, roomAvatar, name);
      setDropGroup(false);
    }

    return(
      <div className="chat-options">
        <img src={avatar} className="image-profile" alt="" />
        <OptionsContainer>
          <OptionsButton 
            src={NewChat}
            alt=""
            onClick={() => {
              setDropChat(!dropChat)
              setDropGroup(false)
              setOtherUsers(users.filter((item: IUser) => item.name !== name))
            }}
          />
            <Dropdown dropdown={dropChat} onClick={() => setDropChat(false)}>
              <ul>
                <DropdownTitle>Escolha um usuário para conversar</DropdownTitle>
                {otherUsers.map((item: IUser) => (
                    <li>
                      <MenuItem>
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
            }}
          />
            <Dropdown dropdown={dropGroup}>
              <ul>
                <DropdownTitle>Insira as informações do novo grupo</DropdownTitle>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                  <GroupLabel>Nome do grupo</GroupLabel>
                  <GroupInput value={roomName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomName(e.target.value)} />
                  <GroupLabel>Imagem do grupo</GroupLabel>
                  <GroupInput value={roomAvatar} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomAvatar(e.target.value)}/>
                  <GroupButton onClick={handleNewGroup} >Criar Grupo</GroupButton>
                </div>
              </ul>
            </Dropdown>
            <Overlay dropdown={dropChat} onClick={() => setDropChat(false)}/>
          <OptionsButton
            src={LogOutIcon}
            alt=""
            onClick={logOut}
          />
        </OptionsContainer>
      </div>
    )
}

export default ChatOptions