
interface Props {
  chatId: number
}

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import ChatCard from './ChatCard';

const ChatResult = ({ chatId }: Props) => {
  if (chatId != 0 && !chatId) return;

  const { chats } = useSelector((state: RootState) => state.chat)
  const chatMessage = chats.filter((i: any) => i.id == chatId)[0].chatMessage;

  return (
    <div style={{ width: "100%", height: "100%", overflow: "auto", display: "flex", flexDirection: 'column' }}>
      {
        chatMessage.map((i: any, index: any) => {
          if (index == 0) return;
          return (
            <div key={index}>
              <ChatCard question={i.message.content} answer={i.answer} />
            </div>
          )
        })
      }
    </div>
  )
}

export default ChatResult;
