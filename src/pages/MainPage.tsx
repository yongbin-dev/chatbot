import MainLayout from '@/layout/MainLayout';
import Footer from './Footer';
import Main from '@/components/main/Main';
import Header from '../components/chat/ChatHeader';


export default function MainPage() {
  return (
    <MainLayout>
      <Header/>
      <Main/>
      <Footer/>
    </MainLayout>
    );
}