import './styles.css'
import socket from 'socket.io-client';
import Logo from '../../assets/whatsappweb.png'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { selectRandom } from '../../utilities/functions';

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
          io.emit("join", name, avatar, color); 
          setUser({id: id, name: name, avatar: avatar, color: color});
          setJoined(true);
        }
      }

    return(
        <div className="container">
            <div className="back-ground"></div>
            <div className="login-container">
                <img className="login-logo" src={Logo} alt="" />
                <span className="login-message">Bem-vindo!</span>
                <span className="login-label">Digite seu nome</span>
                <input className="login-input" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                <span className="login-label">Insira o link de uma imagem para seu perfil</span>
                <input className="login-input" value={avatar} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAvatar(e.target.value)} />
                <button className="login-button" onClick={() => handleJoin()}>Entrar</button>
            </div>
        </div>
    )
}

export default EnterName