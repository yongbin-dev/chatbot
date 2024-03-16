
import { Textarea } from "@mui/joy";

import { Box, Container } from "@mui/material";
import Button from '@mui/material/Button';
import { useState } from "react";

import ChatResult from "./ChatResult";
import classes from "./style/chat.module.css";


interface Props {
  readonly handleQuestionButton : (inputValue : string) => void;
  readonly handleInitButton : () => void;
}

const ChatMain = ( {handleQuestionButton , handleInitButton} : Props ) => {

  const [inputValue, setInputValue] = useState<string>();
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if(!inputValue) return;
      handleQuestionButton(inputValue);
    }
  }

  const onClickQuestionButton = () =>{
    if(!inputValue) return;
    handleQuestionButton(inputValue);
  }

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
        <Container>
          <div className={classes.question_wrapper}>
            <Textarea
              className={classes.question_textarea}
              onChange={onChange}
              placeholder="질문을 입력해주세요"
              onKeyPress={handleKeyPress}
            />
            <Button 
              className={classes.question_button} 
              onClick={onClickQuestionButton} 
              variant="outlined" 
              color="success">
              질문하기
            </Button>
            <Button 
              className={classes.question_button} 
              onClick={handleInitButton} 
              variant="outlined" 
              color="error">
              초기화
            </Button>
          </div>
        </Container>
      </Box>

    </>
  )
}

export default ChatMain; 