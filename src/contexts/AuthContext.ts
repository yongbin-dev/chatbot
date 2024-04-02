import React from "react";

interface LoginContextType {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}


const AuthContext = React.createContext<LoginContextType | null>(null);

export default AuthContext;