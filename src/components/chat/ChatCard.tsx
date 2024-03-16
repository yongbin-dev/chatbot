import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Markdown from '../common/Markdown';

interface Props {
  question: string,
  answer: string
}

const ChatCard = ({ question, answer }: Props) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          <b>{question} </b>
        </Typography>

        <Typography variant="body2">
          <Markdown text={answer} />
        </Typography>

      </CardContent>
    </Card>
  );
}

export default ChatCard;