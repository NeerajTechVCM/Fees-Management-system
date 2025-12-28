import React from 'react'
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { LogOutIcon } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function Logout() {
    const navigate = useNavigate();
    const handleLogout = async ()=>{
  
        
          const result = await fetch("/logout", {
            method: "POST",
            headers: {
              "Content-Type": 'application/json'
            },
         
            credentials: 'include',
          });
          const data = await result.json();
       
          if (data.success) {
        
        
            navigate("/login");
            toast.success(data.message)
        
          } else {
            navigate("/");
          
          }
        }
  return (
    <>
    <Toaster/>
 <Button
  onClick={handleLogout}
  className="bg-black text-white hover:bg-indigo-600 hover:text-yellow-300 transition duration-300 shadow-sm rounded-md px-4 py-2 flex items-center gap-2"
>
  <LogOutIcon className="w-5 h-5" />
  LogOut
</Button>

    </>
  )
}
