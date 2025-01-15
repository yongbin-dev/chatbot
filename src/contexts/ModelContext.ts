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
}

const OpenAIModelContext = React.createContext<OpenAIModelContextType>({
  openAIModelList: { data: [] },
});

export default OpenAIModelContext;
