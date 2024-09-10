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
  const [drawerOpen, setDrawerOpen] = useState<boolean>();
  const activeChatId = useSelector((state: RootState) => state.chat.activeChatId);
  
  const dispatch = useDispatch();

  const handleIconButtonClick = () => {
    setDrawerOpen(!drawerOpen);
  }

  const handleAllDeleteButton = () => {
    dispatch(deleteAllChatMessage({chatId : activeChatId}));
  }

  return (
    <MainLayout>
      <div style={{ position: "absolute", top: "10px", left: "10px" }}>
        <IconButton onClick={handleIconButtonClick}>
          <DensityMediumIcon />
        </IconButton>
      </div >

      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <IconButton aria-label="delete" size="large" onClick={handleAllDeleteButton}>
          <DeleteIcon fontSize="small"/>
        </IconButton>
      </div >

      <ChatDrawer
        chats={chats}
        isOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />

      <ChatContainer chatId={activeChatId} />
    </MainLayout>
  )
}

export default ChatPage