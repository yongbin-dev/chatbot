import { IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  { title: 'LLM', url: '/chat' },
  // { title: 'LangChain', url: '/langchain' }
];

const Header = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const pathname = location.pathname;
    menuItems.forEach((value, index) => {
      if (value.url === pathname) {
        setActiveIndex(index);
      }
    })
  }, [location])

  const navigate = useNavigate();
  const handleClick = (index: number) => {
    navigate(menuItems[index].url)
  }


  return (
    <div style={{ position: "absolute", top: "10px", left: '50%' }}>
      {menuItems.map((item, index) => (
        <IconButton onClick={() => handleClick(index)} key={index}>
          <Typography sx={{ textAlign: 'center' }} fontWeight={activeIndex === index ? 'bold' : ''}>{item.title}</Typography>
        </IconButton>
      ))}
    </div >
  )
}

export default Header;