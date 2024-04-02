import Login from "@/components/login/LoginComponent";
import { ADMIN_ID, ADMIN_PW } from "@/config";
import AuthContext from "@/contexts/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";



const LoginContainer = () => {

  const authContext = useContext(AuthContext);
  const navigate = useNavigate()
  const onClickLogin = (id : string , pw : string) => {

    if(id == ADMIN_ID && pw == ADMIN_PW){
      authContext?.setIsLogin(true);
      navigate("/");
    }
  }

  return (
    <Login onClickLogin={onClickLogin}/>
  )
}

export default LoginContainer;