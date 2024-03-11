
interface Props {
  chatId: number
}

import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { PrismLight } from 'react-syntax-highlighter';
import ReactMarkdown from 'react-markdown'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ChatResult = ({ chatId }: Props) => {
  if (chatId != 0 && !chatId) return;


  const { chats } = useSelector((state: RootState) => state.chat)
  const chatMessage = chats.filter(i => i.id == chatId)[0].chatMessage;


  console.log(chatMessage);
  // const { chatMessage } = useSelector((state: RootState) => state.chat)

  return (
    <div style={{ width: "100%" }}>
      {
        chatMessage.map((i: any, index: any) => {
          if(index == 0 ) return;
          return <div key={index}>
            <div>
              나 : {i?.message?.content}
            </div>
             
             ChatGPT : 
            <ReactMarkdown components={{
              code({ node, inline, className, style, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <PrismLight
                    style={dark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </PrismLight>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }
            }}>
              {i?.result}
            </ReactMarkdown>
          </div>
        })
      }

    </div>
  )
}

export default ChatResult;
