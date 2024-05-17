import { useContext } from "react";
import Router from "./routes";
import AuthContext from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import { getCookie } from "./utils/cookieUtil";

function App() {
  const loginContext = useContext(AuthContext);
  const cookieLogin = Boolean(getCookie("login"));
  const isLogin = loginContext?.isLogin ;

  if (isLogin == false && cookieLogin != true) {
    return <LoginPage />;
  }

  return <Router />;
}

export default App;
