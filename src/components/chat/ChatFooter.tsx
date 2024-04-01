import { changeModel } from "@/redux/slices/model";
import { RootState } from "@/redux/store";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./style/chat.module.css";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface Props {
  readonly handleQuestionButton: (inputValue: string) => void;
  readonly handleInitButton: () => void;
}

const ChatFooter = ({ handleQuestionButton }: Props) => {

  const dispatch = useDispatch();
  const { isPic } = useSelector((state: RootState) => state.model);

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

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    dispatch(changeModel({ isPic: checked }))
  }

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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox {...label} color="success" onChange={handleOnChange} checked={isPic} />
            <span style={{ color: "grey" }}>사진으로 보기</span>
          </div>
          {/* <Button
            onClick={handleInitButton}
            variant="outlined"
            color="error"
          >
            초기화
          </Button> */}

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
            {/* <VisuallyHiddenInput type="file" /> */}
          </Button>
        </div>
      </div>
      {/* <div className={classes.question_input}>
        
      </div> */}
    </Container>
  );
};

export default ChatFooter;
