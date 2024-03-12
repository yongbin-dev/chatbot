
import { Button, Textarea } from "@mui/joy";
import { Backdrop, Box, CircularProgress, Container } from "@mui/material";
// import { addChatMessage } from '@redux/slice/chat';
// import { RootState } from "@redux/store";
import openAIUtils from "@utils/openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatResult from "./ChatResult";
import classes from "./style/chat.module.css";

const Chat = () => {

  const { chats } = useSelector((state: any) => state.chat)
  const dispatch = useDispatch()

  const [inputValue, setInputValue] = useState<string>();
  const [loading, setLoading] = useState(false);

  const onChange = (e: any) => {
    setInputValue(e.target.value)
  }

  const handleCustomButton = () => {
    if (!inputValue) {
      alert("질문을 입력해주세요!");
      return;
    }

    const msg: ChatCompletionMessageParam = {
      "role": "user",
      "content": inputValue
    }

    setLoading(true);

    const chat_id = 0;
    const chat = chats.filter( (i:any) => i.id === chat_id)[0];
    const messages = chat.chatMessage.map ((i:any) => i.message);


    const newMessage = messages.concat(msg);
    const response = openAIUtils.main(newMessage);

    response.then((res: any) => {

      const result = res.choices[0].message.content;
      const data = {
        id : chat_id , 
        message : msg ,
        result 
      }

      // dispatch(addChatMessage(data));

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


  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

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
            <Button className={classes.question_button} onClick={handleCustomButton}>질문하기</Button>
          </div>
        </Container>
      </Box>

    </>
  )
}

export default Chat; 