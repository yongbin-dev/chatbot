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
import { ModelType } from "@/constants/modelConstants";

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

  const handleQuestionButton = async (inputValue: string, setInputValue: Function) => {
    if (!inputValue.trim()) {
      return <CommonAlert msg={"질문"}></CommonAlert>;
    }

    if (!model) {
      alert('모델을 선택해주세요.')
      return;
    }

    const errorMessage = "api 를 호출하는 도중에 에러가 발생하였습니다.\n모델을 변경하여 다시 시도해주세요.";
    if (chat.isPic == true) {
      createPicChat(inputValue).catch(() => {
        alert(errorMessage);
      });
    } else {
      createChat(inputValue).then(() => {
        setInputValue("")
      }).catch(() => {
        alert(errorMessage);
      });
    }


  };

  const createPicChat = async (inputValue: string) => {
    if (chat.model == ModelType.CLAUDE) return;

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
      pic_message: newMessage,
    };

    setLoading(false);
    dispatch(addChatPic(data));
    moveScroll();
  };

  const createChat = async (inputValue: string) => {
    if (!chat.message) {
      alert('채팅방을 선택해주세요!');
      return;
    }

    const newMessage = [...chat.message];

    const msg: ChatCompletionMessageParam = {
      role: "user",
      content: inputValue,
    };

    // 질문
    newMessage.push(msg);

    const modelType = chat.model
    let result: any

    result = await openAIUtils.sendQuestion(newMessage, modelType, model, false);

    let answerStream = "";

    switch (chat.model) {
      case ModelType.GPT:
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
        break;

      case ModelType.CLAUDE:
        for await (const chunk of result) {
          if (chunk.type == 'content_block_delta') {
            answerStream += chunk.delta.text
          }

          const currentChat: CurrentChat = {
            id: parseInt(chatId),
            question: inputValue,
            answer: answerStream,
          };
          setResult(currentChat);
          moveScroll();
        }

        const claudeMsg: ChatCompletionMessageParam = {
          role: "assistant",
          content: answerStream,
        };

        newMessage.push(claudeMsg);
        break;
    }


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
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              overflow: "auto"
            }}
          >
            <div
              id={"mainDiv"}
              style={{
                height: "70%",
                marginTop: "20px",
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

            <div style={{ marginBottom: "20px", position: "absolute", bottom: 0, width: "100%" }}>
              <ChatFooter
                handleQuestionButton={handleQuestionButton}
                handleInitButton={handleInitButton}
              />
            </div>

          </div>


        </>
      )
      }
    </>
  );
};

export default ChatContainer;
