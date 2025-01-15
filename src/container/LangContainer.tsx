import LangFooter from "@/components/langchain/LangFooter";
import styles from "./container.module.css";
import axios from "axios"
import LangMain from "@/components/langchain/LangMain";
import { useState } from "react";

const LangContainer = () => {

  const [chatMessage, setChatMessage] = useState();

  const handleQuestionButton = async (formData: any, callback: Function) => {
    const { data } = await axios.post("http://localhost:3000/upload", formData, {})
    setChatMessage(data);
    callback()
  };

  const handleInitButton = () => {
  };

  return (
    <>
      <div className={styles.main_container}>
        <div id={"mainDiv"} className={styles.main_div}>
          <LangMain
            chatMessage={chatMessage}
          />
        </div>
      </div>

      <div className={styles.footer_div}>
        <LangFooter
          handleInitButton={handleInitButton}
          handleQuestionButton={handleQuestionButton}
        />
      </div>

    </>
  )
}

export default LangContainer;