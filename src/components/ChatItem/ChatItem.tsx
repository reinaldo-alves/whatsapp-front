import { IMessage } from '../../types/types'
import { ChatItemContainer, ImageProfile, LastMessage, NoReadCounter, TitleChat, TitleChatContainer } from './styles'

interface IProps {
  name: string,
  avatar: string,
  messages: Array<IMessage>,
  counter: number,
  onClick?: any
}

function ChatItem(props: IProps) {
    return(
        <ChatItemContainer onClick={props.onClick}>
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
            <NoReadCounter counter={props.counter}><span>{props.counter}</span></NoReadCounter>
        </ChatItemContainer>
    )
}

export default ChatItem