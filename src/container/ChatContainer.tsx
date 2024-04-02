import { useState } from "react";

import { RootState } from "@/redux/store";
import { addChatMessage, addChatPic, initChatMessage } from "@redux/slices/chat";
import { useDispatch, useSelector } from "react-redux";


import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

import ChatFooter from "@/components/chat/ChatFooter";
import ChatMain from "@/components/chat/ChatMain";
import CommonAlert from "@/components/common/CommonAlert";
import openAIUtils from "@/utils/openai";
import { Backdrop, CircularProgress } from "@mui/material";


type CurrentChat = {
  id: number;
  question: string;
  answer: string;
}

interface Props {
  chatId: string,
}

const ChatContainer = ({ chatId }: Props) => {

  const [loading, setLoading] = useState(false);
  const { chats } = useSelector((state: RootState) => state.chat);
  const { model, isPic } = useSelector((state: RootState) => state.model);
  const [result, setResult] = useState<CurrentChat>();
  const chatMessage = chats.filter((i: any) => i.id == chatId)[0].chatMessage;

  const dispatch = useDispatch();

  const handleQuestionButton = async (inputValue: string) => {
    if (!inputValue.trim()) {
      return <CommonAlert msg={"질문"}></CommonAlert>;
    }

    if (isPic) {

      setLoading(true);
      const stream = await openAIUtils.sendQuestionImageGeneration(inputValue);

      const msg: ChatCompletionMessageParam = {
        role: "user",
        content: inputValue,
      };

      const data = {
        id: chatId,
        message: msg,
        result: "",
        isPic: true,
        picUrl: stream.data[0].url
      };

      setLoading(false);
      dispatch(addChatPic(data));
      moveScroll();

    } else {

      const newMessage = chatMessage.map((i: any) => {
        return i.message
      })

      const msg: ChatCompletionMessageParam = {
        role: "user",
        content: inputValue,
      };

      newMessage.push(msg);

      setLoading(true);
      const result = await openAIUtils.sendQuestion(newMessage, model, false);

      let answerStream = "";

      for await (const chunk of result) {
        if (chunk.choices[0]?.delta?.content) {
          answerStream += chunk.choices[0]?.delta?.content;
        }
        const currentChat: CurrentChat = {
          id: parseInt(chatId),
          question: inputValue,
          answer: answerStream
        }
        setResult(currentChat);
        moveScroll();
      }

      const data = {
        id: chatId,
        message: msg,
        result: answerStream,
      };

      setResult(undefined)
      setLoading(false);
      dispatch(addChatMessage(data));
    }



  };

  const handleInitButton = () => {
    const chat_id = chatId;
    dispatch(initChatMessage({ id: chat_id }));
  };

  const moveScroll = () => {
    const mainDiv = document.getElementById('mainDiv');
    if (!mainDiv) return;
    mainDiv.scrollTop = mainDiv.scrollHeight + 9999;
  }

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div id={"mainDiv"} style={{ marginTop: "20px", width: "100%", height: "75vh", overflowY: "auto" }}>
        <ChatMain chatId={chatId} chatMessage={chatMessage} currentMessage={result} />
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
