import socket from 'socket.io-client';
import Logo from '../../assets/whatsappweb.png'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { selectRandom } from '../../utilities/functions';
import { LoginButton, LoginContainer, LoginInput, LoginLabel, LoginLogo, LoginMessage } from './styles';

const io = socket('http://localhost:4000')

function EnterName() {
    const { name, setName, avatar, setAvatar, setUser, setJoined, id, setId } = useContext(UserContext);
    
    const colors = ['red', 'blue', 'pink', 'green', 'gray', 'orange', 'brown']

    const socket = io.connect();

    socket.on("connect", () => {
        setId(socket.id);
    });

    const handleJoin = () => {
        if(name){
          const color = selectRandom(colors)
          io.emit("join", name, avatar? avatar : 'https://img.freepik.com/vetores-premium/icone-de-perfil-de-avatar_188544-4755.jpg?w=2000', color); 
          setUser({id: id, name: name, avatar: avatar? avatar : 'https://img.freepik.com/vetores-premium/icone-de-perfil-de-avatar_188544-4755.jpg?w=2000', color: color});
          setJoined(true);
        }
      }

    return(
        <div className="container">
            <div className="back-ground"></div>
            <LoginContainer>
                <LoginLogo src={Logo} alt="" />
                <LoginMessage>Bem-vindo!</LoginMessage>
                <LoginLabel>Digite seu nome</LoginLabel>
                <LoginInput value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                <LoginLabel>Insira o link de uma imagem para seu perfil</LoginLabel>
                <LoginInput value={avatar} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAvatar(e.target.value)} />
                <LoginButton onClick={() => handleJoin()}>Entrar</LoginButton>
            </LoginContainer>
        </div>
    )
}

export default EnterName