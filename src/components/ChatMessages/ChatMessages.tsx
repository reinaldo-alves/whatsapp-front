import { useContext, useRef, useState, useEffect } from 'react'
import socket from 'socket.io-client';
import SendMessageIcon from '../../assets/send.png';
import NewMember from '../../assets/novo-usuario.png';
import LogOutIcon from '../../assets/log-out.png';
import PinIcon from '../../assets/fixado.png';
import CamIcon from '../../assets/videos.png';
import ChatIcon from '../../assets/chat-bot.png';
import HambMenu from '../../assets/hamburger.png';
import { IMessage, IRoom, IUser } from '../../types/types';
import { UserContext } from '../../contexts/UserContext';
import { ButtonsContainer, ChatInputArea, ChatMessagesArea, Dropdown, DropdownTitle, GroupMembers, HeaderContainer, ImageProfile, InfoChatContainer, MenuItem, MessageBaloon, MessageContainer, MessageHour, MessageMessage, MessageName, MessagesPosition, OptionsButton, OptionsContainer, Overlay, TitleChat, TitleChatContainer, VideoContainer } from './styles';
import { MessageContext } from '../../contexts/MessageContext';
import { hourMessage, isInArray, updateMessages } from '../../utilities/functions';

const io = socket('http://localhost:4000')

interface IProps {
  room: IRoom
}

interface Message {
  type: string,
  candidate: string | null;
  sdpMid?: string | null;
  sdpMLineIndex?: number | null
}

const configuration = {
  iceServers: [{ urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] }],
  iceCandidatePoolSize: 10
};

let pc: RTCPeerConnection | null;
let localStream: MediaStream | null;

async function makeCall(remoteVideo: React.RefObject<HTMLVideoElement>) {
  try {
    pc = new RTCPeerConnection(configuration);
    pc.onicecandidate = event => {
      const message: Message = {type: 'candidate', candidate: null};
      if(event.candidate) {
        message.candidate = event.candidate.candidate;
        message.sdpMid = event.candidate.sdpMid;
        message.sdpMLineIndex = event.candidate.sdpMLineIndex;
      };
      io.emit('video', message);
    };
    pc.ontrack = event => {
      if(remoteVideo.current) {
        remoteVideo.current.srcObject = event.streams[0]
      };
    };
    if(localStream) {
      localStream.getTracks().forEach(track => pc?.addTrack(track, localStream!));
    }
    const offer = await pc.createOffer();
    io.emit('video', {type: "offer", sdp: offer.sdp});
    await pc.setLocalDescription(offer);
  } catch(error) {
    console.error(error);
  }
}

async function handleOffer(offer: RTCSessionDescriptionInit, remoteVideo: React.RefObject<HTMLVideoElement>) {
  if(pc) {
    console.error("PeerConnection existente");
    return;
  }
  try {
    pc = new RTCPeerConnection(configuration);
    pc.onicecandidate = event => {
      const message: Message = {type: 'candidate', candidate: null};
      if(event.candidate) {
        message.candidate = event.candidate.candidate;
        message.sdpMid = event.candidate.sdpMid;
        message.sdpMLineIndex = event.candidate.sdpMLineIndex;
      };
      io.emit('video', message);
    };
    pc.ontrack = event => {
      if(remoteVideo.current) {
        remoteVideo.current.srcObject = event.streams[0];
      }
    }
    if(localStream) {
      localStream.getTracks().forEach(track => pc?.addTrack(track, localStream!));
    }
    await pc.setRemoteDescription(offer);
    const answer = await pc.createAnswer();
    io.emit('video', {type: "answer", sdp: answer.sdp});
    await pc.setLocalDescription(answer);
  } catch(error) {
    console.error(error);
  }
}

async function handleAnswer(answer: RTCSessionDescriptionInit) {
  if(!pc) {
    console.error("Sem PeerConnection");
    return;
  }
  try {
    await pc.setRemoteDescription(answer);
  } catch(error) {
    console.error(error);
  }
}

async function handleCandidate(candidate: RTCIceCandidateInit) {
  try {
    if(!pc) {
      console.error("Sem PeerConnection");
      return;
    }
    await pc.addIceCandidate(candidate ?? undefined);
  } catch(error) {
    console.error(error);
  }
}

async function hangup() {
  if(pc) {
    pc.close();
    pc = null;
  }
  if(localStream) {
    localStream.getTracks().forEach(track => track.stop());
  }
  localStream = null;
}

function ChatMessages(props: IProps) {
  const { user, otherUsers, setOtherUsers, users, showMenu, setShowMenu } = useContext(UserContext);
  const { allMessages, setAllMessages, activator, setActivator, myRooms, activeRoom, setActiveRoom, fixed, setFixed, messageInputRef } = useContext(MessageContext);

  const [message, setMessage] = useState("");
  const [dropList, setDropList] = useState(false);
  const [videoChat, setVideoChat] = useState(false);

  const messagesArea = useRef<HTMLDivElement>(null);
  const localVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);

  const renderMessages = allMessages[props.room.roomname] || []

  const [groupUsers] = myRooms.filter((item: IRoom) => item.roomname === props.room.roomname) as Array<IRoom>

  const handleMessage = () => {
    if(message){
      io.emit("message", {user: user, message: message, hour: hourMessage()}, props.room)
      setMessage("")
    }
  }

  const handleMessageByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleMessage()
      setActivator(!activator)
    }
  }

  const roomFixing = () => {
    if (fixed.roomname === activeRoom.roomname) {
      setFixed({name: '', avatar: '', users: [], group: true, roomname: ''})
    } else {
      setFixed(activeRoom)
    }
    console.log(fixed.roomname)
  }

  const quitGroup = () => {
    io.emit("exitgroup", user, activeRoom);
  }

  function handleNewMember(newMember: IUser) {
    if (!newMember.online) {
      alert(`${newMember.name} está offline. Tente novamente mais tarde`)
    } else if (isInArray(props.room.users, newMember.email)) {
      alert(`${newMember.name} já está neste grupo`)
    } else {
      io.emit("adduser", newMember, props.room);
      setDropList(false);
    }
  }

  async function startVideo() {
    try {
      io.emit("videomessage", props.room, user, true);
      localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: { echoCancellation: true }
      });
      if(localVideo.current) {
        localVideo.current.srcObject = localStream;
      }
    } catch(error) {
      console.log(error);
    }
    io.emit('video', {type: 'ready'});
  };

  async function hangVideo() {
    io.emit("videomessage", props.room, user, false);
    hangup();
    io.emit('video', {type: 'bye'});
  };

  useEffect(() => {
    io.on("message", (message, roomName) => setAllMessages(() => updateMessages(allMessages, message, roomName)))
    if (messagesArea.current) {
      messagesArea.current.scrollBy(0, window.innerHeight);
    }
  }, [allMessages, activator])

  useEffect(() => {
    io.on("generalMessage", (message) => {
      if (message === 'success') {
        alert(`Você saiu do grupo ${myRooms.filter((item: IRoom) => item.roomname === props.room.roomname)[0].name}`)
        setActiveRoom({name: '', avatar: '', users: [], messages: [], group: true, roomname: ''});
      } else {
        alert(message)
      }
    })
  }, [])

  useEffect(() => {
    if(videoChat) {
      console.log('videochat iniciado');
      startVideo();
    } else {
      console.log('videochat encerrado');
      hangVideo();
    }
  }, [videoChat])

  useEffect(() => {
    setVideoChat(false);
  }, [props.room.name]);

  useEffect(() => {
    const handleSocketVideo = (e: any) => {
      if(!localStream) {
        console.log("Ainda não está pronto");
        return;
      }
      switch (e.type) {
        case "offer":
          handleOffer(e, remoteVideo);
          break;
        case "answer":
          handleAnswer(e);
          break;
        case "candidate":
          handleCandidate(e);
          break;
        case "ready":
          if(pc) {
            console.log("Chamada em curso, ignorando...");
            return;
          }
          makeCall(remoteVideo);
          break;
        case "bye":
          if(pc) {
            hangup();
            setVideoChat(false);
          }
          break;
        default:
          console.log('Tipo não reconhecido: ', e);
          break;
      }
    };
    io.on('video', handleSocketVideo);
    return () => {
      io.off('video', handleSocketVideo);
    }
  }, [])

  return(
    <>
      <HeaderContainer>
        <InfoChatContainer>
          <OptionsButton src={HambMenu} alt='' menu={true} onClick={() => setShowMenu(!showMenu)} />
          <ImageProfile
           src={myRooms.filter((item: IRoom) => item.roomname === props.room.roomname)[0].avatar}
          alt="" />
          <TitleChatContainer>
            <TitleChat>
              {myRooms.filter((item: IRoom) => item.roomname === props.room.roomname)[0].name}
            </TitleChat>
            <GroupMembers>
              {!props.room.group? '' :
              groupUsers.users.map((user: IUser, index: number) => (
                <span key={index}>{user.name}{index + 1 < groupUsers.users.length? ', ' : ''}</span>
                ))} 
            </GroupMembers>
          </TitleChatContainer>
        </InfoChatContainer>
        <ButtonsContainer>
          <OptionsContainer>
            <OptionsButton src={PinIcon} alt="" onClick={roomFixing} />
              {props.room.group?
                <>
                  <OptionsButton src={NewMember} onClick={() => {
                    setDropList(!dropList)
                    setOtherUsers(users.filter((item: IUser) => item.email !== user.email))
                  }} />
                  <Dropdown dropdown={dropList} onClick={() => setDropList(false)}>
                    <ul>
                      <DropdownTitle>Adicione um usuário no grupo</DropdownTitle>
                      {otherUsers.filter((el: IUser) => !isInArray(props.room.users, el.email)).length===0?
                        <span style={{display: 'block', width: '100%', textAlign: 'center'}}>
                          Nenhum usuário para adicionar
                        </span>
                      : ''}
                      {[...otherUsers]
                        .sort((a: IUser, b: IUser) => {
                          const nomeA = a.name.toUpperCase();
                          const nomeB = b.name.toUpperCase();
                          if (nomeA < nomeB) return -1;
                          if (nomeA > nomeB) return 1;
                          return 0
                        })
                        .filter((el: IUser) => !isInArray(props.room.users, el.email))
                        .map((item: IUser, index: number) => (
                          <li>
                            <MenuItem key={index} onClick={() => handleNewMember(item)} online={item.online}>
                                <img alt="" src={item.avatar} />
                                <span>{item.online? item.name : `${item.name} (offline)`}</span>
                            </MenuItem>
                          </li>
                      ))}
                    </ul>
                  </Dropdown>
                  <Overlay dropdown={dropList} onClick={() => setDropList(false)}/>
                  <OptionsButton src={LogOutIcon} alt="" onClick={quitGroup} />
                </>
              : 
                <OptionsButton src={videoChat ? ChatIcon : CamIcon} alt="" onClick={() => setVideoChat(!videoChat)} /> 
              }
            </OptionsContainer>
        </ButtonsContainer>
      </HeaderContainer>

      {videoChat && !props.room.group ?
        <VideoContainer>
          <div>
            <video ref={localVideo} autoPlay muted></video>
            <span>{user.name}</span>
          </div>
          <div>
            <video ref={remoteVideo} autoPlay></video>
            <span>{myRooms.filter((item: IRoom) => item.roomname === props.room.roomname)[0].name}</span>
          </div>
        </VideoContainer>
      :
        <>
          <ChatMessagesArea ref={messagesArea}>
              {renderMessages.map((message: IMessage, index: number) => (
                <MessagesPosition key={index} system={!message.user.email} myMessage={message.user.email===user.email}>
                  <MessageBaloon system={!message.user.email} myMessage={message.user.email===user.email}>
                    {message.user.email? 
                      <MessageContainer>
                        {props.room.group? <MessageName color={message.user.color}>{message.user.name}</MessageName> : ''}
                        <MessageMessage>{message.message}</MessageMessage>
                        <MessageHour>{message.hour}</MessageHour>
                      </MessageContainer>
                    :
                    <span>{message.message}</span>
                    }
                  </MessageBaloon>
                </MessagesPosition>
              ))}
          </ChatMessagesArea> 

          <ChatInputArea>
                <input
                  ref={messageInputRef}
                  type='text'
                  onKeyUp={handleMessageByEnter}
                  placeholder="Mensagem"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <img src={SendMessageIcon} alt="" onClick={() => {
                  handleMessage()
                  setActivator(!activator)
                }}/>
          </ChatInputArea>
        </>
      }

    </> 
  )
}

export default ChatMessages