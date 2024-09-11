import { RootState, useSelector } from "@/redux/store";
import openAIUtils from "@/utils/openai";
import CloseIcon from "@mui/icons-material/Close";
import { Textarea } from "@mui/joy";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

import * as React from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface Props {
  onSave: (value: string) => void;
  isOpenDialog: boolean;
  readonly setIsOpenDialog: (open: boolean) => void;
}

export default function ChatSystemMessageDialog({
  onSave,
  isOpenDialog,
  setIsOpenDialog,
}: Props) {

  if (!isOpenDialog) return;

  const { activeChat } = useSelector((state: RootState) => state.chat);
  const [value, setValue] = React.useState<string>(activeChat.systemMessage);

  const handleClose = () => {
    setIsOpenDialog(false);
  };

  const handleSave = () => {
    if (!value) return;
    onSave(value);
  };

  const onChangeEvent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleTemplate = () => {
    const systemMessageTemplate = openAIUtils.getSystemMessage();
    setValue(systemMessageTemplate );
  }

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpenDialog}
      >
        <DialogTitle 
          sx={{ m: 0, p: 2 }} 
          id="customized-dialog-title"
        >
          채팅방 시스템 메시지 설정
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            선택한 해당 채팅방의 초기 시스템 메시지를 입력해주세요 <br />
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "2em",
              width: '100%',
              height: '300px',
            }}
          >
            <Textarea
              style={{
                height: '100%',
                width: '100%',
              }}
              onChange={onChangeEvent}
              placeholder="채팅방 시스템 메시지"
              value={value}
            />
          </div>
        </DialogContent>

        <DialogActions>
          
          <Button 
            variant="contained" 
            onClick={handleTemplate}
          >
            Template
          </Button>

          <Button
            onClick={handleClose}
          >
            취소
          </Button>
          <Button
            onClick={handleSave}
            autoFocus
          >
            저장
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
