import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { IconButton, styled } from '@mui/joy';
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import classes from "./style/chat.module.css";
import ImageIcon from '@mui/icons-material/Image';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

interface Props {
  readonly handleQuestionButton: (inputValue: any, setInputValue: Function) => void;
  readonly handleInitButton: () => void;
}

const LangFooter = ({ handleQuestionButton }: Props) => {

  const fileInputRef = useRef<HTMLInputElement | null>(null); // ref 타입 정의
  const [inputValue, setInputValue] = useState<string>();
  const [file, setFile] = useState<any>(null);

  const onFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      // Blob 객체를 ArrayBuffer로 변환
      switch (file.type) {
        case "application/pdf":
          setFile(file); // 선택한 파일 저장
          break;
      }
    } else {
      console.error('Error')
    }
  }

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


    if (file) {
      const formData = new FormData();
      formData.append('message', inputValue)
      formData.append('uploadFile', file);

      handleQuestionButton(formData, fn_initForm);
    } else {

    }
  };

  const fn_initForm = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // 파일 입력 값을 초기화
    }
    setInputValue('')
  }


  return (
    <Container>
      <div className={classes.question_wrapper} id={"chatTextArea"} style={{ borderColor: "#0288d1" }}>

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
          <div>
            {/* <Input type="file" onChange={onFileChange} ref={fileInputRef} /> */}


            <IconButton style={{ marginRight: '0.5em' }} component="label">
              <MusicNoteIcon />
              <VisuallyHiddenInput
                type="file"
                onChange={onFileChange}
              />
            </IconButton>

            <IconButton style={{ marginRight: '0.5em' }} component="label">
              <PictureAsPdfIcon />
              <VisuallyHiddenInput
                type="file"
                onChange={onFileChange}
                ref={fileInputRef}
              />
            </IconButton>

            <IconButton style={{ marginRight: '0.5em' }} component="label">
              <ImageIcon />
              <VisuallyHiddenInput
                type="file"
                onChange={onFileChange}
                ref={fileInputRef}
              />
            </IconButton>

            <IconButton style={{ marginRight: '0.5em' }} component="label">
              <img
                src="/images/icon/excel_icon.png"
                srcSet="/images/icon/excel_icon.png"
                loading="lazy"
                alt=""
              />
              <VisuallyHiddenInput
                type="file"
                onChange={onFileChange}
                ref={fileInputRef}
              />
            </IconButton>


            {/* <span style={{}}>
              {file ? file.name : ""}
            </span> */}
          </div>

          <div>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              color="info"
              tabIndex={-1}
              onClick={onClickQuestionButton}
              startIcon={<PlayCircleOutlineIcon />}
            >
              질문하기
            </Button>

          </div>
        </div>
      </div>
    </Container>
  );
};

export default LangFooter;
