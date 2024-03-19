import { Box } from "@mui/material";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import ChatCard from "./ChatCard";

const ChatMain = () => {
  const chatId = 0;
  const { chats } = useSelector((state: RootState) => state.chat);
  const chatMessage = chats.filter((i: any) => i.id == chatId)[0].chatMessage;

  return (
    <>
      <div style={{ width: "100vw", height: "100%" , overflowY: "auto"}}>
        <Box>
          {chatMessage.map((i: any, index: any) => {
            if (index == 0) return;
            return (
              <div key={index}>
                <ChatCard question={i.message.content} answer={i.answer} />
                <br />
              </div>
            );
          })}
        </Box>
      </div>
    </>
  );
};

export default ChatMain;
