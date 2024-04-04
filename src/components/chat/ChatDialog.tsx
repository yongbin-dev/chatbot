import { addChat } from '@/redux/slices/chat';
import CloseIcon from '@mui/icons-material/Close';
import { Checkbox, Input, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

import * as React from 'react';
import { useDispatch } from 'react-redux';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface Props {
  title: string,
  isOpenDialog: boolean
  readonly setIsOpenDialog: (open: boolean) => void;
}

export default function ChatDialog({ isOpenDialog, setIsOpenDialog }: Props) {

  const [value, setValue] = React.useState<string>();
  const [checked , setChecked] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  const handleClose = () => {
    setIsOpenDialog(false);
  }

  const handleSave = () => {

    if (!value) return;

    const data = {
      title: value,
      isPic : checked
    }

    dispatch(addChat(data));
    setIsOpenDialog(false);
  }

  const onChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }


  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setChecked(checked);
  }

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpenDialog}
      >
        
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          채팅방
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            채팅방을 생성한 후 하단 모델을 선택한 뒤 진행해주세요. <br/>
            이미지를 검색하고 싶다면 하단 '사진'을 클릭하여 체크해주시기 바랍니다.
          </Typography>


          <div style={{ display: 'flex', alignItems: 'center' , marginTop: '2em' , float : 'right'}}>
            <div>
              <Input onChange={onChangeEvent} placeholder='채팅방 이름' />
            </div>

            <div style={{marginLeft : '10px'}}>
              <span style={{ color: "grey" }}>사진</span>
              <Checkbox {...label} color="success" onChange={handleOnChange} checked={checked} />
            </div>
          </div>
          {/*<Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </Typography> */}
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