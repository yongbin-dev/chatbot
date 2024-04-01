
import { Container } from "@mui/material";
import { useDispatch } from "react-redux";
import ChatCard from "./ChatCard";
import { deleteChatMessage } from "@/redux/slices/chat";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

type CurrentChat = {
  id: number;
  question: string;
  answer: string;
}

interface Props {
  chatId: string
  chatMessage: ChatCompletionMessageParam[];
  currentMessage: CurrentChat | undefined
}

const ChatMain = ({ chatId, chatMessage, currentMessage }: Props) => {
  const dispatch = useDispatch();

  const handleDeleteButton = (messageIndex: number) => {
    const data = {
      chatId,
      messageIndex
    }
    dispatch(deleteChatMessage(data))
  }


  return (
    <>
      <Container>
        {chatMessage.map((i: any, index: any) => {
          if (index == 0) return;
          return (
            <div key={index}>
              {i?.isPic == true ?
                <ChatCard
                  question={i.message.content}
                  isPic={i.isPic}
                  answer={i.picUrl}
                  messageId={index}
                  handleDeleteButton={handleDeleteButton}
                />
                :
                <ChatCard
                  question={i.message.content}
                  answer={i.answer}
                  messageId={index}
                  handleDeleteButton={handleDeleteButton}
                />
              }

              <br />
            </div>
          );
        })}

        {currentMessage && (
          <div>
            <ChatCard
              question={currentMessage.question}
              answer={currentMessage.answer}
              messageId={currentMessage.id}
              handleDeleteButton={handleDeleteButton}
            />
          </div>
        )}

      </Container>
    </>
  );
};

export default ChatMain;
