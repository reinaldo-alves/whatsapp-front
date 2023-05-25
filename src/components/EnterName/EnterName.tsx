import socket from 'socket.io-client';
import Logo from '../../assets/whatsappweb.png'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { searchUserbyEmail, selectRandom } from '../../utilities/functions';
import { LoginButton, LoginContainer, LoginInput, LoginLabel, LoginLogo, LoginMessage, TextAddUser } from './styles';

const io = socket('http://localhost:4000')

function EnterName() {
    const { name, setName, email, setEmail, avatar, setAvatar, password, setPassword, setUser, users, setUsers, setJoined, setId } = useContext(UserContext);
    
    const colors = ['red', 'blue', 'pink', 'green', 'gray', 'orange', 'brown']

    const socket = io.connect();

    const [newUser, setNewUser] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [password1, setPassword1] = useState('');

    useEffect(() => {
        io.emit("login", email, password);
        io.on("messagelogin", (message) => setErrorMessage(message));
        io.on("users", (users) => setUsers(users));
      }, [email, password])

    socket.on("connect", () => {
        setId(socket.id);
    });

    const handleLogin = () => {
        const loggedUser = searchUserbyEmail(email, users)
        if(email && password){
          if (errorMessage === 'logged') {
            setUser(loggedUser);
            setJoined(true);
          } else {
            alert(errorMessage);
          }
        } else {
            alert('Digite o email e a senha corretamente');
        }
      }

      const addNewUser = () => {
        if(name && email && password && password1){
          if(password === password1){
            const color = selectRandom(colors);
            io.emit("join", name, email, avatar? avatar : 'https://img.freepik.com/vetores-premium/icone-de-perfil-de-avatar_188544-4755.jpg?w=2000', password, color); 
            setNewUser(false)
            alert('Usuário criado com sucesso! Faça o login para continuar')
            setName('');
            setPassword('');
            setEmail('');
            setAvatar('');
            setPassword1('');
          } else {
            alert('As senhas não são iguais. Tente novamente')
          }
        } else {
            alert('Preencha todos os dados corretamente')
        }
      }

    return(
        <div className="container">
            <div className="back-ground"></div>
            <LoginContainer active={!newUser}>
                <LoginLogo src={Logo} alt="" />
                <LoginMessage>Bem-vindo!</LoginMessage>
                <LoginLabel>Digite seu email</LoginLabel>
                <LoginInput type='text' value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                <LoginLabel>Digite sua senha</LoginLabel>
                <LoginInput type='password' value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                <LoginButton onClick={() => handleLogin()}>Entrar</LoginButton>
                <TextAddUser>Não possui conta? <span onClick={() => {
                    setNewUser(true)
                    setEmail('')
                    setPassword('')
                }}>Clique aqui para criar</span></TextAddUser>
            </LoginContainer>
            <LoginContainer active={newUser}>
                <LoginMessage>WhatsApp Web - Criar novo usuário</LoginMessage>
                <LoginLabel>Digite seu nome</LoginLabel>
                <LoginInput value={name} type='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                <LoginLabel>Digite seu email</LoginLabel>
                <LoginInput value={email} type='email' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                <LoginLabel>Insira o link de uma imagem para seu perfil</LoginLabel>
                <LoginInput value={avatar} type='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAvatar(e.target.value)} />
                <LoginLabel>Digite sua senha nos dois campos abaixo</LoginLabel>
                <div style={{display: 'flex', gap: '20px'}}>
                    <LoginInput width='220px' type='password' value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                    <LoginInput width='220px' type='password' value={password1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword1(e.target.value)} />
                </div>
                <div style={{marginTop: '20px', display: 'flex', gap: '40px'}}>
                    <LoginButton width='120px' onClick={() => {
                        setNewUser(false)
                        setEmail('')
                        setPassword('')
                        setName('')
                        setAvatar('')
                        setPassword1('')
                    }}>Cancelar</LoginButton>
                    <LoginButton width='120px' onClick={() => addNewUser()}>Criar</LoginButton>
                </div>
            </LoginContainer>
        </div>
    )
}

export default EnterName