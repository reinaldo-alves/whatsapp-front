import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MessageStore } from './contexts/MessageContext';
import { UserStore } from './contexts/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <UserStore>
    <MessageStore>
      <App />
    </MessageStore>
  </UserStore>
);

//O que falta
//- Tentar redirecionar para conversa/grupo quando ele for criado
//- Criar grupo com enter
//- Adicionar propriedade 'online' no IUser
//- Colocar nas listas de criar chat e adicionar em grupo avisos se os usuários estão online ou não e só permitir interação com os online
//- Mostrar alert quando abrir um chat com um usuário que não está online