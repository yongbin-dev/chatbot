import React from "react";

export type OpenAIModel = {
  id: string,
  object: string,
  created: number,
  owned_by: string
}

export type OpenAIModelList = {
  object: "list",
  data: OpenAIModel[]
}

export interface OpenAIModelContextType {
  openAIModelList: OpenAIModelList ;
  setOpenAIModelList: (value: OpenAIModelList ) => void;
}

const OpenAIModelContext = React.createContext<OpenAIModelContextType | null>(null);

export default OpenAIModelContext;