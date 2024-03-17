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
        <section>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: "150px",
              minHeight: '100vh',
              minWidth: '100vw'
            }}
          >
            {children}
          </Box>
        </section>
      </div>
    </>
  )
}

export default MainLayout