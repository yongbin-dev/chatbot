import { ModelType } from '@/constants/modelConstants';
import { Model, model_list } from '@/constants/modelList';
import { addChat } from '@/redux/slices/chat';
import CloseIcon from '@mui/icons-material/Close';
import { Checkbox, FormControl, Input, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
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
  isOpenDialog: boolean
  readonly setIsOpenDialog: (open: boolean) => void;
}

export default function ChatDialog({ isOpenDialog, setIsOpenDialog }: Props) {

  const [value, setValue] = React.useState<string>();
  const [checked, setChecked] = React.useState<boolean>(false);
  const [model, setModel] = React.useState<string>(ModelType.GPT);
  const [isPicDisabled, setIsPicDisabled] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (model == ModelType.GPT) {
      setIsPicDisabled(false)
    } else {
      setChecked(false)
      setIsPicDisabled(true)
    }
  }, [model])

  const handleChange = (e: SelectChangeEvent) => {
    setModel(e.target.value)
  };


  const ModelTypeList = (
    model_list.map((modelType: Model) => {
      return (
        <MenuItem key={modelType.key} value={modelType.model}>
          <div style={{ display: 'flex' }}>
            <img src={modelType.imgUrl} width={24} />
            <span style={{ marginLeft: '0.5em' }}>{modelType.key}</span>
          </div>
        </MenuItem>
      )
    })
  )

  const dispatch = useDispatch();

  const handleClose = () => {
    setIsOpenDialog(false);
  }

  const handleSave = () => {

    if (!value) return;

    const data = {
      title: value,
      isPic: checked,
      model: model
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
            채팅방을 생성한 후 하단 모델을 선택한 뒤 진행해주세요. <br />
            이미지를 검색하고 싶다면 하단 '사진'을 클릭하여 체크해주시기 바랍니다.
          </Typography>

          <div style={{ display: 'flex', alignItems: 'center', marginTop: '2em', float: 'right' }}>
            <div>
              <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                <InputLabel id="demo-select-small-label">Model</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={model}
                  label="Model"
                  onChange={handleChange}
                >
                  {ModelTypeList}
                </Select>
              </FormControl>
              <Input onChange={onChangeEvent} placeholder='채팅방 이름' />
            </div>

            <div style={{ marginLeft: '10px' }}>
              <span style={{ color: "grey" }}>사진</span>
              <Checkbox {...label} color="success" onChange={handleOnChange} checked={checked} disabled={isPicDisabled} />
            </div>
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