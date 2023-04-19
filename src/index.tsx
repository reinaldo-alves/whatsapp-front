import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

//Desafios Obrigatórios
//3 - Estudar documentação socket.io (principalmente criação de rooms)
//4 - fazer chat individual e novos grups a partir dos seus estudos

//Desafios Opcionais
//5 - Implementação de criação de conta e login
//6 - Mostrar quantidade de mensagens não lidas em um chat
//7 - ser possível transitar entre diferentes conversas
//8 - ser possível fixar uma conversa no topo

//Meus Desafios
//9 - verificação da posição da mensagem por id do usuário
//10 - Styled Components
//11 - Se o scroll tiver embaixo, mostra nova mensagem,
  // se tiver em cima, mostra aviso "novas mensagens" que você clica e scrolla para baixo