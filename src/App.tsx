import { useContext } from "react";
import AuthContext from "./contexts/AuthContext";
import LoginPage from "./pages/common/LoginPage";
import Router from "./routes";
import { getCookie } from "./utils/CookieUtil";


function App() {
  const loginContext = useContext(AuthContext);
  const cookieLogin = Boolean(getCookie("login"));
  const isLogin = loginContext?.isLogin;

  if (isLogin == false && cookieLogin != true) {
    return <LoginPage />;
  }

  return <Router />;
}

export default App;
