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
//- Adicionar validação de email