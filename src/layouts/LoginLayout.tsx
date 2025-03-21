
interface Props {
  children: JSX.Element[] | JSX.Element
}

const LoginLayout = ({ children }: Props) => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {children}
    </div>
  )
}

export default LoginLayout