import { useContext } from "react";
import Router from "./routes";
import AuthContext from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";

function App() {
  const loginContext = useContext(AuthContext);
  const isLogin = loginContext?.isLogin;

  console.log(isLogin)
  if (isLogin == false) {
    return <LoginPage/>;
  }

  return <Router />;
}

export default App;
