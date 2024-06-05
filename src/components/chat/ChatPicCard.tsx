import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";

interface Props {
  question: string;
  answer: string;
  messageId: number;
  isPic?: boolean;
  handleDeleteButton: (id: number) => void;
}

const ChatPicCard = ({
  question,
  answer,
  messageId,
  handleDeleteButton,
}: Props) => {

  const onClickDeleteButton = () => {
    if (messageId == null) return;
    handleDeleteButton(messageId);
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          <b>{question} </b>
          <IconButton aria-label="delete" onClick={onClickDeleteButton}>
            <DeleteIcon />
          </IconButton>
        </Typography>
        <Box
          component="img"
          sx={{ height: 250, width: 250 }}
          src={answer}
        />
      </CardContent>
    </Card>
  );
};

export default ChatPicCard;
