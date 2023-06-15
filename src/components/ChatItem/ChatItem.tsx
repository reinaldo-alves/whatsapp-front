import { IMessage } from '../../types/types'
import PinIcon from '../../assets/fixado.png'
import { ChatItemContainer, FixedIcon, ImageProfile, LastMessage, NoReadCounter, TitleChat, TitleChatContainer } from './styles'

interface IProps {
  name: string,
  avatar: string,
  messages: Array<IMessage>,
  counter: number,
  fixed: boolean,
  active: boolean,
  onClick?: any
}

function ChatItem(props: IProps) {
    return(
        <ChatItemContainer fixed={props.fixed} counter={props.counter} onClick={props.onClick} active={props.active}>
            <ImageProfile src={props.avatar} alt="" />
            <TitleChatContainer>
              <TitleChat>{props.name}</TitleChat>
              <LastMessage>
                {!props.messages.length? '' : 
                  props.messages[props.messages.length - 1].user.name? `${props.messages[props.messages.length - 1].user.name}: ${props.messages[props.messages.length - 1].message}` :
                  props.messages[props.messages.length - 1].message
                }
              </LastMessage>
            </TitleChatContainer>
            <FixedIcon fixed={props.fixed} src={PinIcon} alt='' />
            <NoReadCounter counter={props.counter}><span>{props.counter}</span></NoReadCounter>
        </ChatItemContainer>
    )
}

export default ChatItem