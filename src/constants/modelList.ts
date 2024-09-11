import { ModelType } from "@/constants/modelConstants";

export type Model = {
  key : string , 
  model : ModelType , 
  children : ModelDetail[],
  imgUrl? : string , 
}

export type ModelDetail = {
  key: string,
  value: string,
  token: number,
  default? : boolean
}

export const model_list : Model[] = [
  {
    key: ModelType.GPT,
    model: ModelType.GPT,
    imgUrl : "/images/gpt.png",
    children: [
      {
        key: "gpt-4o",
        value: "gpt-4o",
        token: 128000,
        default: true,
      },
      {
        key: "gpt-4-0125-preview",
        value: "gpt-4-0125-preview",
        token: 12800,
      },
      {
        key: "gpt-4",
        value: "gpt-4",
        token: 8192,
      },
      {
        key: "gpt-3.5-turbo-0125",
        value: "gpt-3.5-turbo-0125",
        token: 16385,
      },
      {
        key: "gpt-3.5-turbo",
        value: "gpt-3.5-turbo",
        token: 16385,
      },
    ],
  },
  { 
    key: ModelType.CLAUDE ,
    model: ModelType.CLAUDE ,
    imgUrl : "/images/claude.png",
    children : []
  },
];
