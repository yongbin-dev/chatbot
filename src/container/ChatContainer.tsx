import { useState } from "react";

import { RootState } from "@/redux/store";
import {
  addChatMessage,
  addChatPic,
  initChatMessage,
} from "@redux/slices/chat";
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
};

interface Props {
  chatId: string;
}

const ChatContainer = ({ chatId }: Props) => {
  const [loading, setLoading] = useState(false);
  const { chats } = useSelector((state: RootState) => state.chat);
  const { model } = useSelector((state: RootState) => state.model);
  const [result, setResult] = useState<CurrentChat | null>();

  const chat = chats.filter((i: any) => i.id == chatId)[0];
  const dispatch = useDispatch();

  const handleQuestionButton = async (inputValue: string) => {
    if (!inputValue.trim()) {
      return <CommonAlert msg={"질문"}></CommonAlert>;
    }

    if (chat.isPic == true ) {
      createPicChat(inputValue);
    } else {
      createChat(inputValue);
    }
  };

  const createPicChat = async (inputValue: string) => {
    setLoading(true);

    
    const pic_message = chat.pic_message ? [...chat.pic_message] : [];
    const newMessage = pic_message;

    const stream = await openAIUtils.sendQuestionImageGeneration(inputValue);

    newMessage.push({
        question: inputValue,
        answer: stream.data[0].url,
    })

    const data = {
      id: chatId,
      pic_messaage: newMessage,
    };

    setLoading(false);
    dispatch(addChatPic(data));
    moveScroll();
  };

  const createChat = async (inputValue: string) => {
    const newMessage = [...chat.message];

    const msg: ChatCompletionMessageParam = {
      role: "user",
      content: inputValue,
    };

    // 질문
    newMessage.push(msg);
    const result = await openAIUtils.sendQuestion(newMessage, model, false);
    let answerStream = "";

    for await (const chunk of result) {
      if (chunk.choices[0]?.delta?.content) {
        answerStream += chunk.choices[0]?.delta?.content;
      }
      const currentChat: CurrentChat = {
        id: parseInt(chatId),
        question: inputValue,
        answer: answerStream,
      };
      setResult(currentChat);
      moveScroll();
    }

    // 답변
    const assistantMsg: ChatCompletionMessageParam = {
      role: "assistant",
      content: answerStream,
    };

    newMessage.push(assistantMsg);

    const data = {
      id: chatId,
      message: newMessage,
    };

    setResult(null);
    dispatch(addChatMessage(data));
  };

  const handleInitButton = () => {
    const chat_id = chatId;
    dispatch(initChatMessage({ id: chat_id }));
  };

  const moveScroll = () => {
    const mainDiv = document.getElementById("mainDiv");
    if (!mainDiv) return;
    mainDiv.scrollTop = mainDiv.scrollHeight + 9999;
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {chat && (
        <>
          <div
            id={"mainDiv"}
            style={{
              marginTop: "20px",
              width: "100%",
              height: "75vh",
              overflowY: "auto",
            }}
          >
            <ChatMain
              chatId={chatId}
              chatMessage={chat.message}
              currentMessage={result}
              isPic={chat.isPic}
              picMessage={chat.pic_message}
            />
          </div>

          <div
            style={{
              width: "100%",
              minHeight: "10vh",
              position: "absolute",
              bottom: "0",
            }}
          >
            <ChatFooter
              handleQuestionButton={handleQuestionButton}
              handleInitButton={handleInitButton}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ChatContainer;
