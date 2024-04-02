import LoginContainer from '@/container/LoginContainer';
import MainLayout from '@layouts/MainLayout';

export default function LoginPage() {
  console.log(1)
  return (
    <MainLayout>
      <LoginContainer/>
    </MainLayout>
  );
}