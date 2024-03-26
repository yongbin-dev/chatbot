import { useEffect, useState } from "react";

import { RootState } from "@/redux/store";
import { addChatMessage, initChatMessage } from "@redux/slices/chat";
import { useDispatch, useSelector } from "react-redux";

import { Backdrop, CircularProgress, IconButton } from "@mui/material";

import openAIUtils from "@utils/openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

import DensityMediumIcon from '@mui/icons-material/DensityMedium';

import ChatDrawer from "@/components/chat/ChatDrawer";
import ChatFooter from "@/components/chat/ChatFooter";
import ChatMain from "@/components/chat/ChatMain";
import CommonAlert from "@/components/common/CommonAlert";


const ChatContainer = () => {

  const [chatId, setChatId] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>();
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

    const chat_id = chatId;
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

  };

  const handleInitButton = () => {
    const chat_id = 0;
    dispatch(initChatMessage({ id: chat_id }));
  };

  const handleIconButtonClick = () => {
    setDrawerOpen(!drawerOpen);
  }

  useEffect(() => {

  }, [])

  useEffect(() => {
    if (loading == true) return;
    const mainDiv = document.getElementById('mainDiv');
    if (!mainDiv) return;
    mainDiv.scrollTop = mainDiv.scrollHeight + 1000;

  }, [loading])


  if (!(chats.length > 0)) {
    return (
      <>
        <div style={{ position: "absolute", top: "10px", left: "10px" }}>
          <IconButton onClick={handleIconButtonClick}>
            <DensityMediumIcon />
          </IconButton>
        </div >

        <ChatDrawer
          chats={chats}
          isOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          setChatId={setChatId}
        />
      </>
    )
  }

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div style={{ position: "absolute", top: "10px", left: "10px" }}>
        <IconButton onClick={handleIconButtonClick}>
          <DensityMediumIcon />
        </IconButton>
      </div >

      <ChatDrawer
        chats={chats}
        isOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        setChatId={setChatId}
      />

      <div id={"mainDiv"} style={{ marginTop: "20px", width: "100%", height: "85vh", overflowY: "scroll" }}>
        <ChatMain id={chatId} />
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
