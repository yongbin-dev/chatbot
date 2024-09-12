import ChatContainer from '@/container/ChatContainer';
import MainLayout from '@layouts/MainLayout';

import { OPEN_API } from '@/config';
import OpenAIModelContext from '@/contexts/ModelContext';


import ChatDrawer from '@/components/chat/ChatDrawer';
import { RootState, useSelector } from '@/redux/store';
import { useContext, useEffect } from 'react';

const ChatPage = () => {
  const {activeChat } = useSelector((state: RootState) => state.chat);
  const openAIModelContext = useContext(OpenAIModelContext);

  useEffect(()=> {
    if(openAIModelContext){
      const {setOpenAIModelList} = openAIModelContext;
      fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPEN_API}`,
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setOpenAIModelList(data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
    }
  } , [])

  return (
    <MainLayout>
      <ChatDrawer/>
      <ChatContainer chatId={activeChat.id} />
    </MainLayout>
  )
}

export default ChatPage