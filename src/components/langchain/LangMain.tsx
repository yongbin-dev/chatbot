import ChatCard from "../chat/ChatCard";
import { Container } from "@mui/material";
import styles from "./style/chat.module.css"

interface Props {
  chatMessage: any;
}

const LangMain = ({
  chatMessage,
}: Props) => {

  const handleDeleteButton = () => {

  }


  if (!chatMessage) return;
  // const message = chatMessage.slice(1);

  return (
    <>
      <div id={"mainDiv"} className={styles.main_div}>
        <Container>
          <ChatCard
            question={chatMessage.question}
            answer={chatMessage.message}
            messageId={0}
            handleDeleteButton={handleDeleteButton}
          />
          <br />
        </Container>
      </div>
    </>

  );
}

export default LangMain;