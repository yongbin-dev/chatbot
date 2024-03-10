import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface Props {
  result: string | undefined
}


const ChatResult = ({ result }: Props) => {

  const markdown = `
    console.log('It works!')
    const asd = () => {
      console.log(123)
    }
  `

  if (!result) return;


  return (
    <div style={{ width: "100%" }}>


      <SyntaxHighlighter language="javascript" style={docco}>
        {markdown}
      </SyntaxHighlighter>
      {/* <ReactMarkdown>
      </ReactMarkdown>, */}

    </div>
  )
}

export default ChatResult;
