import { useEffect, useState } from "react";

import { RootState } from "@/redux/store";
import { addChatMessage, initChatMessage } from "@redux/slices/chat";
import { useDispatch, useSelector } from "react-redux";

import { Backdrop, CircularProgress } from "@mui/material";

import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

import ChatFooter from "@/components/chat/ChatFooter";
import ChatMain from "@/components/chat/ChatMain";
import CommonAlert from "@/components/common/CommonAlert";
import openAIUtils from "@/utils/openai";

interface Props {
  chatId: string,
}

const ChatContainer = ({ chatId }: Props) => {

  const [loading, setLoading] = useState(false);
  const { chats } = useSelector((state: RootState) => state.chat);
  const { model } = useSelector((state: RootState) => state.model);
  const chatMessage = chats.filter((i: any) => i.id == chatId)[0].chatMessage;

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

    const newMessage = chatMessage.map((i: any) => {
      return i.message
    })

    newMessage.push(msg);

    const result = await openAIUtils.sendQuestion(newMessage, model, false);

    const data = {
      id: chatId,
      message: msg,
      result,
    };

    dispatch(addChatMessage(data));
    setLoading(false);
  };

  const handleInitButton = () => {
    const chat_id = chatId;
    dispatch(initChatMessage({ id: chat_id }));
  };

  useEffect(() => {
    if (loading == true) return;
    const mainDiv = document.getElementById('mainDiv');
    if (!mainDiv) return;
    mainDiv.scrollTop = mainDiv.scrollHeight + 1000;
  }, [loading])

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div id={"mainDiv"} style={{ marginTop: "20px", width: "100%", height: "85vh", overflowY: "scroll" }}>
        <ChatMain chatId={chatId} chatMessage={chatMessage} />
      </div>

      <div style={{ width: "100%", minHeight: "10vh", position: "absolute", bottom: '0' }}>
        <ChatFooter
          handleQuestionButton={handleQuestionButton}
          handleInitButton={handleInitButton}
        />
      </div>

    </>
  );
};

export default ChatContainer;
