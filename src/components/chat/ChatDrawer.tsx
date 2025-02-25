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
import { Button, Divider, FormControl, IconButton, InputLabel, ListSubheader, MenuItem, Select, SelectChangeEvent } from '@mui/material';
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
import ChatModelDescriptionDialog from "./ChatModelDescriptionDialog";
import ChatSystemMessageDialog from "./ChatSystemMessageDialog";
import style from "./style/chat.module.css";

const convertGPTModelList = (data: OpenAIModel[]) => {
  const groupList: any = { 'others': [] };
  data.filter((i: OpenAIModel) => i.model == ModelType.GPT)
    .map((model: any) => {
      if (model.groups.length == 0) {
        groupList['others'].push(model)
      } else {
        const firstModelGroup = model.groups[0];
        if (Object.keys(groupList).indexOf(firstModelGroup) < 0) {
          groupList[firstModelGroup] = [model]
        } else {
          groupList[firstModelGroup].push(model)
        }
      }
    })

  return groupList
}

const getModelItem = (data: OpenAIModel[], modelType: ModelType) => {
  if (modelType === ModelType.GPT) {
    const gptModelList = convertGPTModelList(data)
    const modelTypeList: any = [];

    Object.keys(gptModelList).sort().map((modelKey: any) => {
      modelTypeList.push(
        <div key={modelKey}>
          <ListSubheader component="div" id="nested-list-subheader">
            {modelKey}
          </ListSubheader>
          <Divider />
        </div>
      )
      const modelComponent = gptModelList[modelKey].map((mt: OpenAIModel) => {
        return (
          <MenuItem key={mt.id} value={mt.id}>
            {mt.id}
          </MenuItem>
        )
      })
      modelTypeList.push(modelComponent)
    })

    return modelTypeList;

  } else {
    const modelTypeList = data.filter((i: OpenAIModel) => i.model == modelType)
      .sort((a: any, b: any) => { return b.id - a.id })
      .map((mt: OpenAIModel) => {
        return (
          <MenuItem key={mt.id} value={mt.id}>
            {mt.id}
          </MenuItem>
        )
      })

    return modelTypeList
  }
}

interface Props {
}

export default function ChatDrawer({ }: Props) {
  const openAIModelContext = useContext(OpenAIModelContext);
  const { model } = useSelector((state: RootState) => state.model);
  const { chats, activeChat } = useSelector((state: RootState) => state.chat);

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [isOpenChangeDialog, setIsOpenChangeDialog] = useState<boolean>(false);
  const [isOpenModelDescriptionDialog, setIsOpenModelDescriptionDialog] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  const handleIconButtonClick = () => {
    setDrawerOpen(!drawerOpen);
  }

  const handleDescriptionButtonClick = () => {
    setIsOpenModelDescriptionDialog(!isOpenModelDescriptionDialog);
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
    console.log(event.target.value)
    const model = event.target.value;
    dispatch(changeModel({ model }))
  };

  const getModelList = () => {
    const modelType = chats.filter((c: any) => c.id == activeChat.id)[0];

    if (!modelType || !openAIModelContext) return <></>;

    const { data } = openAIModelContext.openAIModelList
    const modelTypeList = getModelItem(data, modelType.model)
    return modelTypeList
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

            <div className={style.drawer_descriptionModel_wrapper}>
              <Button
                variant="contained"
                onClick={handleDescriptionButtonClick}
              >
                설명보기
              </Button>
            </div>
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
      </div>

      <ChatDialog
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
      />

      <ChatSystemMessageDialog
        onSave={onChangeMessage}
        isOpenDialog={isOpenChangeDialog}
        setIsOpenDialog={setIsOpenChangeDialog}
      />

      <ChatModelDescriptionDialog
        isOpenModelDescriptionDialog={isOpenModelDescriptionDialog}
        setIsOpenModelDescriptionDialog={setIsOpenModelDescriptionDialog}
      />
    </>
  );
}