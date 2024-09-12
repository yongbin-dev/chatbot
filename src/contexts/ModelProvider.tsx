import { useState } from "react";
import OpenAIModelContext, { OpenAIModelList } from "./ModelContext.js";


interface Props {
  children : JSX.Element
}

const ModelProvider = ({children} : Props) => {

  const init : OpenAIModelList = {
    object : "list",
    data : []
  }

  const [openAIModelList , setOpenAIModelList] = useState<OpenAIModelList>(init);

  return (
    <OpenAIModelContext.Provider value={{openAIModelList , setOpenAIModelList}}>
      {children}
    </OpenAIModelContext.Provider>
  )
};


export default ModelProvider;