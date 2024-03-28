
import { Container } from "@mui/material";
import { useDispatch } from "react-redux";
import ChatCard from "./ChatCard";
import { deleteChatMessage } from "@/redux/slices/chat";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

interface Props {
  chatId: string
  chatMessage: ChatCompletionMessageParam[];
}

const ChatMain = ({ chatId, chatMessage }: Props) => {
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
              <ChatCard
                question={i.message.content}
                answer={i.answer}
                messageId={index}
                handleDeleteButton={handleDeleteButton}
              />
              <br />
            </div>
          );
        })}
      </Container>
    </>
  );
};

export default ChatMain;
