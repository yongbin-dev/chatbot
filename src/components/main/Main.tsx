import { Container, CssBaseline } from "@mui/joy";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Main = () =>{
  
  return (
    <div>
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          <Link to="/chat">OpenAI 채팅</Link>
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'Pin a footer to the bottom of the viewport.'}
          {'The footer will move as the main element of the page grows.'}
        </Typography>
        <Typography variant="body1">Sticky footer placeholder.</Typography>
      </Container>
    </div>
  )
}

export default Main;