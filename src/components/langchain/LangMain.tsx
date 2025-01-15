import ChatCard from "../chat/ChatCard";
import { Container } from "@mui/material";

interface Props {
  chatMessage: any;
}

const LangMain = ({
  chatMessage,
}: Props) => {

  const handleDeleteButton = () => {

  }


  console.log(chatMessage)
  if (!chatMessage) return;
  // const message = chatMessage.slice(1);

  return (
    <>
      <Container>
        <ChatCard
          question={chatMessage.question}
          answer={chatMessage.message}
          messageId={0}
          handleDeleteButton={handleDeleteButton}
        />
        <br />
      </Container>
    </>
  );
}

export default LangMain;