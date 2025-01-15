import MainLayout from '@layouts/MainLayout';
import Footer from './Footer';
import Main from '@components/main/Main';

export default function MainPage() {
  return (
    <MainLayout>
      <Main />
      <Footer />
    </MainLayout>
  );
}