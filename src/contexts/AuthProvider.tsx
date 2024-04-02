import { useState } from "react";
import AuthContext from "./AuthContext.js";


interface Props {
  children : JSX.Element
}

const AuthProvider = ({children} : Props) => {

  const [isLogin , setIsLogin] = useState(false);

  return (
    <AuthContext.Provider value={{isLogin , setIsLogin}}>
      {children}
    </AuthContext.Provider>
  )
};


export default AuthProvider;