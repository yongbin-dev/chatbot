import { deleteChat } from '@/redux/slices/chat';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChatIcon from '@mui/icons-material/Chat';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ChatDialog from './ChatDialog';

interface Props {
  isOpen?: boolean,
  chats: any,
  readonly setDrawerOpen: (isOpen: boolean) => void;
  readonly setChatId: (chatId: number) => void;
}

export default function ChatDrawer({ chats, isOpen = false, setDrawerOpen, setChatId }: Props) {

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const dispatch = useDispatch();

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  const handleIconButton = (id: number) => {
    if (!id) return;
    setChatId(id);
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