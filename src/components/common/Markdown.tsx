
import ReactMarkdown from 'react-markdown';
import { PrismLight } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Props {
  text : string
}

const Markdown = ({ text } : Props ) => {
  if(!text) return ;

  return (
    // eslint-disable-next-line
    <ReactMarkdown components={{
      code({ node, inline, className, style, children, ...props }) { 
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
          <PrismLight
            style={dark}
            language={match[1]}
            PreTag="div"
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </PrismLight>
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        )
      }
    }}>
      {text}
    </ReactMarkdown>
  )
};

export default Markdown;
