import { Box } from "@mui/material"

interface Props {
  children: JSX.Element[] | JSX.Element
}


const MainLayout = ({ children }: Props) => {
  return (
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
  )
}

export default MainLayout