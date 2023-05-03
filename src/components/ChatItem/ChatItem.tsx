import { IMessage } from '../../types/types'
import { ChatItemContainer, ImageProfile, LastMessage, TitleChat, TitleChatContainer } from './styles'

interface IProps {
  name: string,
  avatar: string,
  messages: Array<IMessage>,
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
        </ChatItemContainer>
    )
}

export default ChatItem