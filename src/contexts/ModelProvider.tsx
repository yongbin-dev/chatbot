import { useEffect, useState } from "react";
import OpenAIModelContext, { OpenAIModelList } from "./ModelContext.js";
import { OPEN_API } from '@/config';
import { ModelType } from '@/constants/modelConstants';


interface Props {
  children: JSX.Element
}

const claude_model = [
  { id: "claude-3-5-sonnet-latest", object: 'model', model: ModelType.CLAUDE },
  { id: "claude-3-5-sonnet-20241022", object: 'model', model: ModelType.CLAUDE },
  { id: "claude-3-5-sonnet-20240620", object: 'model', model: ModelType.CLAUDE },
  { id: "claude-3-opus-20240229	", object: 'model', model: ModelType.CLAUDE },
  { id: "claude-3-sonnet-20240229", object: 'model', model: ModelType.CLAUDE },
  { id: "claude-3-haiku-20240307", object: 'model', model: ModelType.CLAUDE },
]

const ModelProvider = ({ children }: Props) => {
  const [openAIModelList, setOpenAIModelList] = useState<OpenAIModelList>({ data: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.openai.com/v1/models', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPEN_API}`,
          }
        })

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const { data } = await response.json();
        const modelArr = claude_model;

        data.forEach((obj: any) => {
          const id: String = obj.id;
          const gpt = {
            ...obj,
            model: ModelType.GPT,
            system: id.indexOf("o1") == 0 ? false : true
          };

          modelArr.push(gpt);
        });

        const model_list: any = {
          data: modelArr
        }

        setOpenAIModelList(model_list);
      } catch (err) {
        setOpenAIModelList({ data: [] });
        console.error(err)
      }
    };

    fetchData();

  }, []);

  return (
    <OpenAIModelContext.Provider value={{ openAIModelList }}>
      {children}
    </OpenAIModelContext.Provider>
  )
};


export default ModelProvider;