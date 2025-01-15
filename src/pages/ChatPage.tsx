import ChatContainer from '@/container/ChatContainer';
import MainLayout from '@layouts/MainLayout';
import ChatDrawer from '@/components/chat/ChatDrawer';
import { RootState, useSelector } from '@/redux/store';

const ChatPage = () => {
  const { activeChat } = useSelector((state: RootState) => state.chat);
  return (
    <MainLayout>
      <ChatDrawer />
      <ChatContainer chatId={activeChat.id} />
    </MainLayout>
  )
}

export default ChatPage