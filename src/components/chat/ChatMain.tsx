
import { deleteChatMessage } from "@/redux/slices/chat";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import ChatCard from "./ChatCard";

const ChatMain = () => {
  const chatId = 0;
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
      <div style={{ width: "100vw", height: "100%", overflowY: "auto" }}>
        {chatMessage.map((i: any, index: any) => {
          if (index == 0) return;
          return (
            <div key={index}>
              <ChatCard question={i.message.content} answer={i.answer} messageId={index} handleDeleteButton={handleDeleteButton} />
              <br />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ChatMain;
