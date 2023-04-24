import './styles.css'
import { IMessage } from '../../types/types'

interface IProps {
  name: string,
  avatar: string,
  messages: Array<IMessage>,
  onClick?: any
}

function ChatItem(props: IProps) {
    return(
        <div className="chat-item" onClick={props.onClick}>
            <img src={props.avatar} className="image-profile" alt="" />
            <div className="title-chat-container">
              <span className="title-message">{props.name}</span>
              <span className="last-message">
                {!props.messages.length? '' : 
                  props.messages[props.messages.length - 1].user.name? `${props.messages[props.messages.length - 1].user.name}: ${props.messages[props.messages.length - 1].message}` :
                  props.messages[props.messages.length - 1].message
                }
              </span>
            </div>
        </div>
    )
}

export default ChatItem