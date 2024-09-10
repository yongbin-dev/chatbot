import CloseIcon from "@mui/icons-material/Close";
import { Input, Typography } from "@mui/material";
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
  title: string;
  isOpenDialog: boolean;
  readonly setIsOpenDialog: (open: boolean) => void;
}

export default function ChatSystemMessageDialog({
  onSave,
  isOpenDialog,
  setIsOpenDialog,
}: Props) {

  const [value, setValue] = React.useState<string>();

  const handleClose = () => {
    setIsOpenDialog(false);
  };

  const handleSave = () => {
    if (!value) return;
    onSave(value);
  };

  const onChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };




  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpenDialog}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
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
              width : '100%'
            }}
          >
            <Input onChange={onChangeEvent}  placeholder="채팅방 시스템 메시지" />
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleSave} autoFocus>
            저장
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
