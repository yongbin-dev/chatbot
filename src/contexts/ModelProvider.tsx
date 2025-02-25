import { OPEN_API } from '@/config';
import { ModelType } from '@/constants/modelConstants';
import { getAnthropicModelList, getOpenAIModelList } from '@/utils/openai.js';
import { useEffect, useState } from "react";
import OpenAIModelContext, { OpenAIModelList } from "./ModelContext.js";


interface Props {
  children: JSX.Element
}

const ModelProvider = ({ children }: Props) => {
  const [openAIModelList, setOpenAIModelList] = useState<OpenAIModelList>({ data: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {

        const openModelList = await getOpenAIModelList()
        const claudeModelList = await getAnthropicModelList()

        const modelArr = claudeModelList;

        openModelList.forEach((obj: any) => {
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