import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Container, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import classes from "./style/chat.module.css";

interface Props {
  readonly handleQuestionButton: (inputValue: string, setInputValue: Function, maxToken: number) => void;
  readonly handleInitButton: () => void;
}

const ChatFooter = ({ handleQuestionButton }: Props) => {
  const [inputValue, setInputValue] = useState<string>();
  const [maxToken, setMaxToken] = useState<number>(4048);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    const textDiv = document.getElementById('chatTextArea');
    const mainDiv = document.getElementById('mainDiv');

    if (!textDiv || !mainDiv) {
      return;
    }

    e.preventDefault();

    if (e.ctrlKey && e.key === "Enter") {
      onClickQuestionButton();
      return;
    }

    if (e.key === "Enter") {
      if (textDiv.clientHeight <= 300) {
        textDiv.style.height = textDiv.clientHeight + 'px';
        mainDiv.style.height = mainDiv.clientHeight - 50 + 'px';
        mainDiv.scrollTop = mainDiv.scrollHeight + 9999;
        return;
      }
    };

    if (e.keyCode == 46 || e.keyCode == 8) {
      if (textDiv.clientHeight >= 180) {
        textDiv.style.height = textDiv.clientHeight - 80 + 'px';
        mainDiv.style.height = mainDiv.clientHeight + 50 + 'px';
        mainDiv.scrollTop = mainDiv.scrollHeight + 9999;
        return;
      }
    }


  };

  const onClickQuestionButton = () => {
    if (!inputValue) return;
    setInputValue('')
    handleQuestionButton(inputValue, setInputValue, maxToken);
  };

  const onTokenChange = (e: any) => {
    const value = e.target.value;
    if (!value) return;

    setMaxToken(value);
  }

  return (
    <Container>
      <div className={classes.question_wrapper} id={"chatTextArea"}>
        <div className={classes.textarea_wrapper}>
          <textarea
            className={classes.textarea_input}
            onChange={onChange}
            placeholder="질문을 입력해주세요"
            onKeyUp={handleKeyPress}
            value={inputValue}
          />
        </div>

        <div className={classes.button_wrapper}>
          <TextField
            id="outlined-basic"
            label="token"
            variant="outlined"
            defaultValue={maxToken}
            size="small"
            type={"number"}
            onChange={onTokenChange}
            style={{ marginRight: '1em', width: '100px' }}
          />

          <Button
            component="label"
            role={undefined}
            variant="contained"
            color="success"
            tabIndex={-1}
            onClick={onClickQuestionButton}
            startIcon={<PlayCircleOutlineIcon />}
          >
            질문하기
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ChatFooter;
