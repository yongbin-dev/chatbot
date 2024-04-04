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
    if (e.key === "Enter") {
      e.preventDefault();
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
      <div className={classes.question_wrapper}>
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
