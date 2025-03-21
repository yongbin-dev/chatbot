import { OLLAMA_URL } from "@/config";
import { ModelType } from "@/constants/modelConstants";
import axios from "axios";
import { Ollama } from "ollama";

type OllamaMessage = {
  role: string;
  content: string;
};

export const getOllamaModelList = async () => {
  const models = axios
    .get(`${OLLAMA_URL}/api/tags`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      const { data } = response;
      return convertModelList(data.models);
    })
    .catch(() => {
      return [];
    });

  return models;
};

// export const sendOllamaQuestion = async (
//   model: string,
//   messages: OllamaMessage[]
// ) => {
//   const response = await ollama.chat({
//     model: model,
//     messages: messages,
//     options: {
//       temperature: 0, // Make responses more deterministic
//     },
//   });

//   return response;
// };

export const sendOllamaQuestion = async (
  model: string,
  messages: OllamaMessage[]
) => {
  try {
    const ollama = new Ollama({ host: `${OLLAMA_URL}` });
    const response = await ollama.chat({
      model,
      messages,
      stream: true,
    });

    return response;
  } catch (error) {}
};

// 0
// :
// {name: 'llama2:latest', model: 'llama2:latest', modified_at: '2025-03-20T14:35:10.908639319+09:00', size: 3826793677, digest: '78e26419b4469263f75331927a00a0284ef6544c1975b826b15abdaef17bb962', …}
// 1
// :
// {name: 'deepseek-r1:latest', model: 'deepseek-r1:latest', modified_at: '2025-02-07T11:20:40.530366907+09:00', size: 4683075271, digest: '0a8c266910232fd3291e71e5ba1e058cc5af9d411192cf88b6d30e92b6e73163', …}
// 2
// :
// {name: 'llama3:latest', model: 'llama3:latest', modified_at: '2025-02-07T11:14:16.124328247+09:00', size: 4661224676, digest: '365c0bd3c000a25d28ddbf732fe1c6add414de7275464c4e4d1c3b5fcb5d8ad1', …}
// 3
// :
// {name: 'phi3:latest', model: 'phi3:latest', modified_at: '2025-02-07T11:04:42.829953264+09:00', size: 2176178913, digest: '4f222292793889a9a40a020799cfd28d53f3e01af25d48e06c5e708610fc47e9', …}

const convertModelList = (modelList: any[]) => {
  return modelList.map((model) => {
    return {
      id: model.name,
      object: "model",
      model: ModelType.OLLAMA,
    };
  });
  // {id: 'claude-3-5-sonnet-latest', object: 'model', model: 'CLAUDE'}
};
// // console.log(data);
// setAvailableModels(data.models);

// // get initial model from local storage
// const storedModel = localStorage.getItem("initialLocalLM");
// if (
//   storedModel &&
//   storedModel !== "" &&
//   data.models.findIndex(
//     (m: { name: string }) =>
//       m.name.toLowerCase() === storedModel.toLowerCase(),
//   ) > -1
// ) {
//   setActiveModel(storedModel);
//   const newOllama = new ChatOllama({
//     baseUrl: baseUrl,
//     model: storedModel,
//   });
//   setOllama(newOllama);
// } else {
//   // set initial model to first model in list
//   setActiveModel(data.models[0]?.name);
//   const initOllama = new ChatOllama({
//     baseUrl: baseUrl,
//     model: data.models[0]?.name,
//   });
//   setOllama(initOllama);
// }
