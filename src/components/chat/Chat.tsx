
import { RootState } from "@/store/store";
import { Box, Button, Container, Textarea } from "@mui/joy";
import { Backdrop, CircularProgress } from "@mui/material";
import { addChatMessage } from '@store/chat';
import openAIUtils from "@utils/OpenAiUtils";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatResult from "./ChatResult";
import classes from "./style/chat.module.css";

const Chat = () => {

  const { message } = useSelector((state: RootState) => state.chat)
  const dispatch = useDispatch()

  const [inputValue, setInputValue] = useState<string>();
  const [result, setResult] = useState<string>();
  const [loading, setLoading] = useState(false);

  const onChange = (e: any) => {
    setInputValue(e.target.value)
  }

  const handleCustomButton = () => {
    if (!inputValue) {
      alert("질문을 입력해주세요!");
      return;
    }

    initResult();

    const msg: ChatCompletionMessageParam = {
      "role": "user",
      "content": inputValue
    }

    setLoading(true);

    const newMessage = message.concat(msg);
    const response = openAIUtils.main(newMessage);
    response.then((res: any) => {
      setResult(res.choices[0].message.content)
      dispatch(addChatMessage(msg));
    }).finally(() => {
      setLoading(false)
    });

  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCustomButton();
    }
  }

  const initResult = () => {
    setResult("")
  }


  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* <ChatDrawer isOpen={false} /> */}

      <Container >
        <Box sx={{ bgcolor: '#cfe8fc', height: '80vh'}} >
          <ChatResult result={result}/>
        </Box>

        <Box sx={{ bgcolor: 'red' }} >
          
          <div className={classes.question_wrapper}>
            <Textarea
              className={classes.question_textarea}
              onChange={onChange}
              placeholder="질문을 입력해주세요"
              onKeyPress={handleKeyPress}
            />
            <Button className={classes.question_button} onClick={handleCustomButton}>질문하기</Button>
          </div>
        </Box>
      </Container>


   

    </>
  )
}

export default Chat; 