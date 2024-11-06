import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CustomMarkdown from '../common/CommonMarkdown';

import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';

interface Props {
  question: any,
  answer: any,
  messageId: number,
  handleDeleteButton: (id: number) => void;
}

const ChatCard = ({ question, answer, messageId, handleDeleteButton }: Props) => {

  const onClickDeleteButton = () => {
    if (messageId == null) return;
    handleDeleteButton(messageId);
  }


  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          <Tooltip title={question}>
            <b>{question.length > 20 ? question.substring(0, 20) : question}  </b>
          </Tooltip>
          <IconButton aria-label="delete" onClick={onClickDeleteButton}>
            <DeleteIcon />
          </IconButton>
        </Typography>
        <Typography variant="body2">
          <CustomMarkdown text={answer} />
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ChatCard;