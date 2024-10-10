import { ModelType } from "@/constants/modelConstants";
import { model_list } from "@/constants/modelList";
import OpenAIModelContext, { OpenAIModel } from "@/contexts/ModelContext";
import { ChatType, changeSystemMessage, deleteAllChatMessage, deleteChat, setActiveChat } from "@/redux/slices/chat";
import { changeModel } from "@/redux/slices/model";
import { RootState } from "@/redux/store";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BuildIcon from '@mui/icons-material/Build';
import DeleteIcon from '@mui/icons-material/Delete';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import PhotoIcon from '@mui/icons-material/Photo';
import { FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatDialog from './ChatDialog';
import ChatSystemMessageDialog from "./ChatSystemMessageDialog";
import style from "./style/chat.module.css";

interface Props {
}

export default function ChatDrawer({ }: Props) {
  const openAIModelContext = useContext(OpenAIModelContext);

  const { model } = useSelector((state: RootState) => state.model);
  const { chats, activeChat } = useSelector((state: RootState) => state.chat);

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [isOpenChangeDialog, setIsOpenChangeDialog] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  const handleIconButtonClick = () => {
    setDrawerOpen(!drawerOpen);
  }

  const handleAllDeleteButton = () => {
    dispatch(deleteAllChatMessage({ chatId: activeChat.id }));
  }

  const handleIconButton = (chat: ChatType) => {
    dispatch(setActiveChat(chat));
  }

  const handlePlusButton = () => {
    setIsOpenDialog(true);
  }

  const handleDeleteButton = (id: string) => {
    dispatch(deleteChat({ id }))
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
    if (!modelType || !openAIModelContext) return <></>;
    if (modelType.model == ModelType.GPT) {
      const { data } = openAIModelContext.openAIModelList
      const modelTypeList = data
        // .filter((i : OpenAIModel)=> i.id.startsWith("gpt"))
        .sort((a: any, b: any) => { return b.created - a.created })
        .map((mt: OpenAIModel) => {
          return (
            <MenuItem key={mt.id} value={mt.id}>
              {mt.id}
            </MenuItem>
          )
        })
      return modelTypeList
    } else {
      return (
        <MenuItem key={"claude-3-5-sonnet-20240620"} value={"claude-3-5-sonnet-20240620"}>
          claude-3-5-sonnet-20240620
        </MenuItem>
      )
    }
  }

  if (!activeChat) return;

  return (
    <>
      <div style={{ position: "absolute", top: "10px", left: "10px" }}>
        <IconButton onClick={handleIconButtonClick}>
          <DensityMediumIcon />
        </IconButton>
      </div >

      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <IconButton aria-label="delete" size="large" onClick={handleAllDeleteButton}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div >

      <div>
        <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
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
                        onClick={() => { handleChangeButton() }}
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
                ))
              }
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

        {
          <ChatDialog
            isOpenDialog={isOpenDialog}
            setIsOpenDialog={setIsOpenDialog}
          />
        }

        {
          <ChatSystemMessageDialog
            onSave={onChangeMessage}
            isOpenDialog={isOpenChangeDialog}
            setIsOpenDialog={setIsOpenChangeDialog}
          />
        }
      </div>
    </>
  );
}