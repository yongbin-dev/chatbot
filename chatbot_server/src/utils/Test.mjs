import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import env from "dotenv";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
env.config();

const splitter = new CharacterTextSplitter({
  chunkSize: 1536,
  chunkOverlap: 200,
});

const questionAnsweringPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "Answer the user's questions based on the below context:\n\n{context}",
  ],
  ["human", "{input}"],
]);

const llm = new ChatOpenAI({
  model: "gpt-3.5-turbo-1106",
  temperature: 0,
});

export const getMessage = async (path, message) => {
  try {
    const pdfLoader = new PDFLoader(path);
    const parentDocuments = await pdfLoader.load();
    const chain = await getChain(parentDocuments);
    const result = await chain.invoke({
      input: message,
    });

    return result;
  } catch (err) {
    console.error(err);
  }
  // Retrieved chunks are the larger parent chunks
};

const getChain = async (documents) => {
  const combineDocsChain = await createStuffDocumentsChain({
    llm,
    prompt: questionAnsweringPrompt,
  });

  const vectorstore = await HNSWLib.fromDocuments(
    documents,
    new OpenAIEmbeddings()
  );

  const chain = await createRetrievalChain({
    retriever: vectorstore.asRetriever(),
    combineDocsChain,
  });

  return chain;
};
