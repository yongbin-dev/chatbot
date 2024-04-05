import { deleteChatMessage } from "@/redux/slices/chat";
import { Container } from "@mui/material";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { useDispatch } from "react-redux";
import ChatCard from "./ChatCard";
import ChatPicCard from "./ChatPicCard";

type CurrentChat = {
  id: number;
  question: string;
  answer: string;
};

interface Props {
  chatId: string;
  chatMessage: ChatCompletionMessageParam[];
  currentMessage?: CurrentChat | null;
  isPic?: boolean;
  picMessage?: any;
}

const ChatMain = ({
  chatId,
  chatMessage,
  currentMessage,
  isPic,
  picMessage,
}: Props) => {
  const dispatch = useDispatch();
  const handleDeleteButton = (messageIndex: number) => {
    const data = {
      chatId,
      messageIndex,
    };
    dispatch(deleteChatMessage(data));
  };

  const makeChatPicCard = (message: any) => {
    return message.map((chat: any, index: number) => {
      return (
        <div key={index}>
          <ChatPicCard
            question={chat.question}
            answer={chat.answer}
            messageId={index}
            handleDeleteButton={handleDeleteButton}
          />
        </div>
      );
    });
  };

  const makeChatChard = (message: any) => {
    return message.map((chat: any, index: number) => {
      if (chat.role == "assistant") {
        return (
            <div key={index}>
              <ChatCard
                question={message[index - 1].content}
                answer={message[index].content}
                messageId={index}
                handleDeleteButton={handleDeleteButton}
              />
              <br />
            </div>
        );
      }
    });
  };

  if (!chatMessage) return;
  const message = chatMessage.slice(1);

  return (
    <>
      <Container>
        {isPic == true ? makeChatPicCard(picMessage) : makeChatChard(message)}

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
