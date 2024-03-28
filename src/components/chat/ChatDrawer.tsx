import { model_type_list as modelType } from "@/data/model-type";
import { deleteChat } from '@/redux/slices/chat';
import { changeModel } from '@/redux/slices/model';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChatIcon from '@mui/icons-material/Chat';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormControl, FormLabel, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatDialog from './ChatDialog';
import style from "./style/chat.module.css";
import { RootState } from "@/redux/store";

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

  const handleModelRadioButton = (event: React.ChangeEvent<HTMLInputElement>) => {
    const model = event.target.value;
    if (!model) return;
    dispatch(changeModel({ model }))
  }


  const ModelTypeList = (
    modelType.map((modelType: any) => {
      return <FormControlLabel value={modelType.model} control={<Radio />} label={modelType.key} />
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
                  <ChatIcon />
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
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Model</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={model}
            name="radio-buttons-group"
            onChange={handleModelRadioButton}
            style={{ marginTop: '1em' }}
          >
            {ModelTypeList}
          </RadioGroup>
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