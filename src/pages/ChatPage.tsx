import ChatDrawer from '@/components/chat/ChatDrawer';
import ChatContainer from '@/container/ChatContainer';
import MainLayout from '@layouts/MainLayout';

import { IconButton } from "@mui/material";

import { RootState } from '@/redux/store';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const ChatPage = () => {

  const { chats } = useSelector((state: RootState) => state.chat);
  const [chatId, setChatId] = useState<string>("0");
  const [drawerOpen, setDrawerOpen] = useState<boolean>();

  const handleIconButtonClick = () => {
    setDrawerOpen(!drawerOpen);
  }

  const onClickChat = (chatId: string) => {
    setChatId(chatId)
  }


  return (
    <MainLayout>

      <div style={{ position: "absolute", top: "10px", left: "10px" }}>
        <IconButton onClick={handleIconButtonClick}>
          <DensityMediumIcon />
        </IconButton>
      </div >

      <ChatDrawer
        chats={chats}
        isOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        onClickChat={onClickChat}
      />

      <ChatContainer chatId={chatId} />

    </MainLayout>
  )
}

export default ChatPage