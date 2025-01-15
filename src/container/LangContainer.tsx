import FileCard from "@/components/common/FileCard";
import LangFooter from "@/components/langchain/LangFooter";
import LangMain from "@/components/langchain/LangMain";
import { RootState, useDispatch, useSelector } from "@/redux/store";
import axios from "axios";
import { useState } from "react";
import styles from "./container.module.css";
import { FileType, setCurrentFile } from "@/redux/slices/file";

const LangContainer = () => {

  const { currentFile } = useSelector((state: RootState) => state.file);
  const dispatch = useDispatch();

  const [chatMessage, setChatMessage] = useState();

  const handleQuestionButton = async (formData: any, callback: Function) => {
    const { data } = await axios.post("http://localhost:3000/upload", formData, {})
    const { extension, name, size } = data

    const currentFile: FileType = {
      extension,
      name,
      size,
    }

    dispatch(setCurrentFile(currentFile));

    setChatMessage(data);
    callback()
  };

  const handleInitButton = () => {
  };

  return (
    <>
      <div className={styles.main_container}>
        <FileCard currentFile={currentFile} />
        <LangMain chatMessage={chatMessage} />
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