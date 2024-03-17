

import { Box, Container } from "@mui/material";

import ChatInput from "./ChatInput";
import ChatResult from "./ChatResult";
import classes from "./style/chat.module.css";

interface Props {
  readonly handleQuestionButton: (inputValue: string) => void;
  readonly handleInitButton: () => void;
}

const ChatMain = ({ handleQuestionButton, handleInitButton }: Props) => {
  return (
    <>
      <Container >
        <Box sx={{ height: '80vh' }} >
          <ChatResult chatId={0} />
        </Box>
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
        }}
      >
        <div className={classes.question_wrapper}>
          <ChatInput
            handleQuestionButton={handleQuestionButton}
            handleInitButton={handleInitButton}
          />
        </div>
      </Box>
    </>
  )
}

export default ChatMain; 