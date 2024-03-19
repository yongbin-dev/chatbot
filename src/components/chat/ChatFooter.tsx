import { Textarea } from "@mui/joy";


import Button from "@mui/material/Button";

import classes from "./style/chat.module.css";
import { useState } from "react";

interface Props {
  readonly handleQuestionButton: (inputValue: string) => void;
  readonly handleInitButton: () => void;
}

const ChatFooter = ({ handleQuestionButton, handleInitButton }: Props) => {
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
    <div className={classes.question_input}>
      <Textarea
        className={classes.question_textarea}
        onChange={onChange}
        placeholder="질문을 입력해주세요"
        onKeyPress={handleKeyPress}
        value={inputValue}
      />

      <Button
        className={classes.question_button}
        onClick={onClickQuestionButton}
        variant="outlined"
        color="success"
      >
        질문하기
      </Button>

      <Button
        className={classes.question_button}
        onClick={handleInitButton}
        variant="outlined"
        color="error"
      >
        초기화
      </Button>
    </div>
  );
};

export default ChatFooter;
