import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export const getPdfContent = async (file: any) => {
  const loader = new PDFLoader(file);
  const docs = await loader.load();
  const res = docs[0].pageContent;
  console.log(docs);

  return res;
};
