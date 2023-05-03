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

//Desafios Opcionais
//5 - Implementação de criação de conta e login
//6 - Mostrar quantidade de mensagens não lidas em um chat
//7 - ser possível transitar entre diferentes conversas
//8 - ser possível fixar uma conversa no topo

//Meus Desafios
//11 - Se o scroll estiver em cima, mostra aviso "novas mensagens" que você clica e scrolla para baixo