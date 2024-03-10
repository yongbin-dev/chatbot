
import { Box, Button, Textarea } from "@mui/joy";
import { Backdrop, CircularProgress } from "@mui/material";
import { RootState } from "@/store/store";
import openAIUtils from "@utils/OpenAiUtils";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChatMessage } from '@store/chat';
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import ChatDrawer from "./ChatDrawer";
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

      <Box
        component="section"
        sx={{
          p: 30, border: '1px dashed grey'
        }}>
        asd
      </Box>

      <div className={classes.question_wrapper}>
        <Textarea
          className={classes.question_textarea}
          onChange={onChange}
          placeholder="질문을 입력해주세요"
          onKeyPress={handleKeyPress}
        />

        <Button className={classes.question_button} onClick={handleCustomButton}>질문하기</Button>
      </div>

    </>
  )
}

export default Chat; 