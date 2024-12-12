import ChatContainer from '@/container/ChatContainer';
import MainLayout from '@layouts/MainLayout';

import { OPEN_API } from '@/config';
import OpenAIModelContext from '@/contexts/ModelContext';


import ChatDrawer from '@/components/chat/ChatDrawer';
import { RootState, useSelector } from '@/redux/store';
import { useContext, useEffect } from 'react';
import { ModelType } from '@/constants/modelConstants';

const ChatPage = () => {
  const { activeChat } = useSelector((state: RootState) => state.chat);
  const openAIModelContext = useContext(OpenAIModelContext);

  useEffect(() => {
    if (openAIModelContext) {
      const { setOpenAIModelList } = openAIModelContext;

      const gptModel = fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPEN_API}`,
        }
      }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })

      // claude model
      const claude_model = [
        { id: "claude-3-5-sonnet-latest", object: 'model', model: ModelType.CLAUDE },
        { id: "claude-3-5-sonnet-20241022", object: 'model', model: ModelType.CLAUDE },
        { id: "claude-3-5-sonnet-20240620", object: 'model', model: ModelType.CLAUDE },
        { id: "claude-3-opus-20240229	", object: 'model', model: ModelType.CLAUDE },
        { id: "claude-3-sonnet-20240229", object: 'model', model: ModelType.CLAUDE },
        { id: "claude-3-haiku-20240307", object: 'model', model: ModelType.CLAUDE },

      ]

      const modelArr: any = claude_model;

      Promise.all([gptModel,]).then((values) => {
        const gptModel: [] = values[0].data;
        gptModel.forEach((obj: any) => {
          const id: String = obj.id;
          const gpt = {
            ...obj,
            model: ModelType.GPT,
            system: id.indexOf("o1") == 0 ? false : true
          };

          modelArr.push(gpt);
        });
      }).finally(() => {
        const model_list = {
          data: modelArr
        }

        setOpenAIModelList(model_list);
      })
    }
  }, [])

  return (
    <MainLayout>
      <ChatDrawer />
      <ChatContainer chatId={activeChat.id} />
    </MainLayout>
  )
}

export default ChatPage