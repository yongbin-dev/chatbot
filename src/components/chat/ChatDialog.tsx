import { addChat } from '@/redux/slices/chat';
import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useDispatch } from 'react-redux';

interface Props {
  title: string,
  isOpenDialog: boolean
  readonly setIsOpenDialog: (open: boolean) => void;
}

export default function ChatDialog({ title = "", isOpenDialog, setIsOpenDialog }: Props) {

  const [value, setValue] = React.useState<string>();
  const dispatch = useDispatch();

  const handleClose = () => {
    setIsOpenDialog(false);
  }

  const handleSave = () => {

    if (!value) return;

    const data = {
      title: value
    }

    dispatch(addChat(data));
  }

  const onChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return (
    <React.Fragment>
      <Dialog
        open={isOpenDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Input onChange={onChangeEvent} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleSave} autoFocus>
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}