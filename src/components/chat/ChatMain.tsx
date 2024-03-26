
import { deleteChatMessage } from "@/redux/slices/chat";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import ChatCard from "./ChatCard";
import { Container } from "@mui/material";

interface Props {
  id: number;
}

const ChatMain = ({ id }: Props) => {
  const chatId: number = id;
  const { chats } = useSelector((state: RootState) => state.chat);
  const chatMessage = chats.filter((i: any) => i.id == chatId)[0].chatMessage;
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
              <ChatCard question={i.message.content} answer={i.answer} messageId={index} handleDeleteButton={handleDeleteButton} />
              <br />
            </div>
          );
        })}
      </Container>
    </>
  );
};

export default ChatMain;
