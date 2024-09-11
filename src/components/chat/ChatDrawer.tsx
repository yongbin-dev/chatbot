import { ModelDetail, model_list } from "@/constants/modelList";
import { RootState } from "@/redux/store";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BuildIcon from '@mui/icons-material/Build';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoIcon from '@mui/icons-material/Photo';
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
import ChatSystemMessageDialog from "./ChatSystemMessageDialog";
import style from "./style/chat.module.css";
import { ChatType, changeSystemMessage, deleteChat, setActiveChat } from "@/redux/slices/chat";
import { changeModel } from "@/redux/slices/model";

interface Props {
  isOpen?: boolean,
  chats: any,
  readonly setDrawerOpen: (isOpen: boolean) => void;
}

export default function ChatDrawer({ chats, isOpen = false, setDrawerOpen  }: Props) {
  
  const { model } = useSelector((state: RootState) => state.model);
  const { activeChat } = useSelector((state: RootState) => state.chat);

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [isOpenChangeDialog, setIsOpenChangeDialog] = useState<boolean>(false);

  const dispatch = useDispatch();

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  const handleIconButton = (chat: ChatType) => {
    dispatch(setActiveChat(chat));
  }

  const handlePlusButton = () => {
    setIsOpenDialog(true);
  }

  const handleDeleteButton = (id: string) => {
    dispatch(deleteChat({id}))
  }

  const handleChangeButton = () => {
    setIsOpenChangeDialog(true);
  }

  const onChangeMessage = (message: string) => {
    const data = {
      chatId: activeChat.id,
      message: message,
    }

    dispatch(changeSystemMessage(data));
    setIsOpenChangeDialog(false);
  }


  const handleChange = (event: SelectChangeEvent) => {
    if (!event.target.value) return;
    const model = event.target.value;
    dispatch(changeModel({ model }))
  };

  const getModelList = () => {
    const modelType = chats.filter((c: any) => c.id == activeChat.id)[0];
    if (!modelType) return <></>; 
    
    const modelTypeList = model_list.filter(v => v.key == modelType.model)[0].children;
    const children = modelTypeList.map((mt: ModelDetail) => {
      return (
        <MenuItem key={mt.key} value={mt.value}>
          {mt.key}
        </MenuItem>
      )
    })
    
    return children;
  }

  if (!activeChat) return;

  return (
    <div>
      <Drawer open={isOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" >
          <div style={{ width: "100%" }}>
            <IconButton style={{ float: "right", zIndex: "9999" }} onClick={handlePlusButton}>
              <AddCircleOutlineIcon />
            </IconButton>
          </div>

          <List>
            {
              chats.map((chat: any, index: number) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={() => { handleIconButton(chat) }}>
                    <ListItemIcon>
                      {
                        chat.isPic == true ?
                        <PhotoIcon /> :
                        <img src={model_list.filter(v => v.key == chat.model)[0].imgUrl} width={25} />
                      }
                    </ListItemIcon>
                    <ListItemText primary={chat.title} />

                    <IconButton 
                      aria-label="Open in new tab" 
                      component="a" 
                      href="#as-link" 
                      onClick={() => {handleChangeButton()}}
                    >
                      <BuildIcon />
                    </IconButton>

                    <IconButton 
                      aria-label="Open in new tab" 
                      component="a" 
                      href="#as-link" 
                      onClick={() => { handleDeleteButton(chat.id) }}
                    >
                      <DeleteIcon />
                    </IconButton>

                  </ListItemButton>
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
                {getModelList()}
              </Select>
            </FormControl>
          </div>
        </Box>
      </Drawer>

      <ChatDialog
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
      />

      <ChatSystemMessageDialog
        onSave={onChangeMessage}
        isOpenDialog={isOpenChangeDialog}
        setIsOpenDialog={setIsOpenChangeDialog}
      />

    </div>
  );
}