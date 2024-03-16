import Header from "@/pages/Header"
import { Box } from "@mui/material"

interface Props {
  children: JSX.Element[] | JSX.Element
}


const MainLayout = ({ children }: Props) => {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Header />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            minWidth: '100vw'
          }}
        >
          {children}
        </Box>
      </div>
    </>
  )
}

export default MainLayout