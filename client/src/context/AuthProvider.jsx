import React, { createContext, useContext, useState } from 'react'

 const AuthContext=createContext();

export default function AuthProvider({children}) {
    const user=localStorage.getItem("auth");
    const [auth,setAuth]=useState(user?JSON.parse(user):undefined);
  return (
   <AuthContext.Provider value={[auth,setAuth]}>
    {children}
   </AuthContext.Provider>
  )
}

export const useAuth=()=>useContext(AuthContext);