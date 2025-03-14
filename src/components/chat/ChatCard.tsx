import DeleteIcon from '@mui/icons-material/Delete';
import DetailsIcon from '@mui/icons-material/Details';
import { IconButton, Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import CustomMarkdown from '../common/CommonMarkdown';
import styles from "./style/chat.module.css"

interface Props {
  question: any,
  answer: any,
  messageId: number,
  handleDeleteButton: (id: number) => void;
}

const ChatCard = ({ question, answer, messageId, handleDeleteButton }: Props) => {

  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [content, setContent] = useState<string>(question);

  const onClickDeleteButton = () => {
    if (messageId == null) return;
    handleDeleteButton(messageId);
  }

  const onClickDetailButton = () => {
    setIsDetail(!isDetail)
  }

  useEffect(() => {
    if (isDetail == false) {
      const title = content.length > 20 ? content.substring(0, 20) : content;
      setContent(title)
    } else {
      setContent(question)
    }

  }, [isDetail])

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          <Tooltip title={question} >
            <b>{content}</b>
          </Tooltip>
          <Tooltip title={"자세히 보기"}>
            <IconButton aria-label="detail" onClick={onClickDetailButton}>
              <DetailsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={"삭제"}>
            <IconButton aria-label="delete" onClick={onClickDeleteButton}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Typography>

        <div className={styles.markdown_div}>
          <CustomMarkdown text={answer} />
        </div>
      </CardContent>
    </Card>
  );
}

export default ChatCard;