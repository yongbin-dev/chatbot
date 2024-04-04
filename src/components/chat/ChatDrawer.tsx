import { model_type_list as modelType } from "@/data/model-type";
import { deleteChat } from '@/redux/slices/chat';
import { changeModel } from '@/redux/slices/model';
import { RootState } from "@/redux/store";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChatIcon from '@mui/icons-material/Chat';
import PhotoIcon from '@mui/icons-material/Photo';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatDialog from './ChatDialog';
import style from "./style/chat.module.css";

interface Props {
  isOpen?: boolean,
  chats: any,
  readonly setDrawerOpen: (isOpen: boolean) => void;
  readonly onClickChat: (chatId: string) => void;
}

export default function ChatDrawer({ chats, isOpen = false, setDrawerOpen, onClickChat }: Props) {

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const { model } = useSelector((state: RootState) => state.model);


  const dispatch = useDispatch();

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  const handleIconButton = (id: string) => {
    onClickChat(id);
  }

  const handlePlusButton = () => {
    setIsOpenDialog(true);
  }

  const handleDeleteButton = (id: number) => {
    const data = {
      id
    }
    dispatch(deleteChat(data))
  }


  const handleChange = (event: SelectChangeEvent) => {
    const model = event.target.value;
    if (!model) return;
    dispatch(changeModel({ model }))
  };



  const ModelTypeList = (
    // <FormControlLabel value={modelType.model} control={<Radio />} label={modelType.key} />
    modelType.map((modelType: any) => {
      return <MenuItem key={modelType.key} value={modelType.model}>{modelType.key}</MenuItem>
    })
  )

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" >
      <div style={{ width: "100%" }}>
        <IconButton style={{ float: "right", zIndex: "9999" }} onClick={handlePlusButton}>
          <AddCircleOutlineIcon />
        </IconButton>
      </div>

      <List onClick={toggleDrawer(false)}>
        {
          chats.map((chat: any, index: number) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={
                () => { handleIconButton(chat.id) }}>
                <ListItemIcon>
                  {
                    chat.isPic == true ? 
                    <PhotoIcon /> :
                    <ChatIcon /> 
                  }
                </ListItemIcon>
                <ListItemText primary={chat.title} />
              </ListItemButton>

              <ListItemIcon onClick={() => { handleDeleteButton(chat.id) }}>
                <DeleteIcon />
              </ListItemIcon>
            </ListItem>
          ))}
      </List>

      <div className={style.drawer_radio_wrapper}>
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
      </div>
    </Box>
  );

  return (
    <div>
      <Drawer open={isOpen} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      <ChatDialog
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        title={"채팅 추가하시겠습니까?"}
      />
    </div>
  );
}