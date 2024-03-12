import Chat from '@components/chat/Chat'
import MainLayout from '@layouts/MainLayout'
import Header from '@components/chat/ChatHeader'
import ChatDrawer from '@components/chat/ChatDrawer'

const ChatPage = () => {
  return (
    <MainLayout>
      <Header/>
      {/* <ChatDrawer isOpen={true}/> */}
      <Chat/>
    </MainLayout>
  )
}

export default ChatPage