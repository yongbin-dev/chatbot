import { useState } from "react";

import { RootState } from "@/redux/store";
import { addChatMessage, initChatMessage } from "@redux/slices/chat";
import { useDispatch, useSelector } from "react-redux";

import { Backdrop, CircularProgress } from "@mui/material";

import openAIUtils from "@utils/openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

import ChatFooter from "@/components/chat/ChatFooter";
import ChatMain from "@/components/chat/ChatMain";
import CommonAlert from "@/components/common/CommonAlert";

import { Container } from "@mui/material";

const ChatContainer = () => {
  const [loading, setLoading] = useState(false);
  const { chats } = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();

  const handleQuestionButton = async (inputValue: string) => {
    if (!inputValue.trim()) {
      return <CommonAlert msg={"질문"}></CommonAlert>;
    }

    const msg: ChatCompletionMessageParam = {
      role: "user",
      content: inputValue,
    };

    setLoading(true);

    const chat_id = 0;
    const chat = chats.filter((i: any) => i.id === chat_id)[0];
    const messages = chat.chatMessage.map((i: any) => i.message);

    const newMessage = messages.concat(msg);
    const result = await openAIUtils.sendQuestion(newMessage, false);

    const data = {
      id: chat_id,
      message: msg,
      result,
    };

    dispatch(addChatMessage(data));
    setLoading(false);

    moveScrollBottom();
  };

  const handleInitButton = () => {
    const chat_id = 0;
    dispatch(initChatMessage({ id: chat_id }));
  };

  const moveScrollBottom = () =>{
    const mainDiv = document.getElementById('mainDiv');
    if(!mainDiv) return;
    mainDiv.scrollTop = mainDiv.scrollHeight;
  }

  
  window.addEventListener('scroll', function(){
    const mainDiv = document.getElementById('mainDiv');
    if(!mainDiv) return;
    // window.scrollY = mainDiv.scrollY;
    mainDiv.scrollTop = window.scrollY ;
    debugger
  });


  return (
    <main >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "auto" }}>
        <Container sx={{ height: '100%' }}>
          <div id={"mainDiv"} style={{ overflow: "hidden", flex: "1 1 0%", minHeight: "80vh", maxHeight: "80vh" }}>
            <ChatMain />
          </div>
          <div style={{ minHeight: "20vh", maxHeight: "20vh", marginTop: "50px" }}>
            <ChatFooter
              handleQuestionButton={handleQuestionButton}
              handleInitButton={handleInitButton}
            />
          </div>
        </Container>
      </div>
    </main>
  );
};

export default ChatContainer;
