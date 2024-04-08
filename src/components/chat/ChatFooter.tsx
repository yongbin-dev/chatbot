import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import classes from "./style/chat.module.css";

interface Props {
  readonly handleQuestionButton: (inputValue: string) => void;
  readonly handleInitButton: () => void;
}

const ChatFooter = ({ handleQuestionButton }: Props) => {


  const [inputValue, setInputValue] = useState<string>();
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    const textDiv = document.getElementById('chatTextArea');

    if (!textDiv) {
      return;
    }

    e.preventDefault();
    if (e.key === "Enter") {
      if (textDiv.clientHeight <= 300) {
        textDiv.style.height = textDiv.clientHeight + 'px';
      }
    };

    if (e.keyCode == 46 || e.keyCode == 8) {
      if (textDiv.clientHeight >= 180) {
        textDiv.style.height = textDiv.clientHeight - 80 + 'px';
      }
    }

    if (e.ctrlKey && e.key === "Enter") {
      onClickQuestionButton();
    }
  };

  const onClickQuestionButton = () => {
    if (!inputValue) return;
    handleQuestionButton(inputValue);
    setInputValue("");
  };


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
