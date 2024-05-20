import ChatDrawer from '@/components/chat/ChatDrawer';
import ChatContainer from '@/container/ChatContainer';
import MainLayout from '@layouts/MainLayout';

import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";

import { deleteAllChatMessage } from '@/redux/slices/chat';
import { RootState } from '@/redux/store';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ChatPage = () => {

  const { chats } = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();
  const [chatId, setChatId] = useState<string>(chats[0].id ? chats[0].id.toString()  : "0");
  const [drawerOpen, setDrawerOpen] = useState<boolean>();

  const handleIconButtonClick = () => {
    setDrawerOpen(!drawerOpen);
  }

  const onClickChat = (chatId: string) => {
    setChatId(chatId)
  }

  const handleAllDeleteButton = () => {
    const data = {
      chatId
    }

    dispatch(deleteAllChatMessage(data));
  }


  return (
    <MainLayout>

      <div style={{ position: "absolute", top: "10px", left: "10px" }}>
        <IconButton onClick={handleIconButtonClick}>
          <DensityMediumIcon />
        </IconButton>
      </div >

      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <IconButton aria-label="delete" size="large">
          <DeleteIcon fontSize="small" onClick={handleAllDeleteButton} />
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