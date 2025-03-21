import Header from "@/pages/common/Header"

interface Props {
  children: JSX.Element[] | JSX.Element
}

const MainLayout = ({ children }: Props) => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Header />
      {children}
    </div>
  )
}

export default MainLayout