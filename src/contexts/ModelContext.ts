import React from "react";

export type OpenAIModel = {
  id: string;
  object: string;
  created: number;
  owned_by: string;
  model: string;
};

export type OpenAIModelList = {
  data: OpenAIModel[];
};

export interface OpenAIModelContextType {
  openAIModelList: OpenAIModelList;
  setOpenAIModelList: (value: OpenAIModelList) => void;
}

const OpenAIModelContext = React.createContext<OpenAIModelContextType | null>(
  null
);

export default OpenAIModelContext;
