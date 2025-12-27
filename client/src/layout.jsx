import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"; 
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from 'react-router-dom';
import Logout from "./components/Logout";
export default function Layout() {
  return (
    <SidebarProvider>
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Area */}
      <div className="relative w-full flex flex-col">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-800 to-indigo-900 w-full p-3 flex justify-between items-center sticky top-0 shadow-lg z-10">
          <SidebarTrigger className="text-white hover:text-yellow-300 bg-indigo-800 hover:bg-indigo-700 rounded p-2 transition duration-300 shadow-sm hover:shadow-md" />
          <Logout />
        </div>

        {/* Main Content */}
        <main className="flex-1 flex flex-col w-full bg-gradient-to-br from-gray-50 via-gray-100 to-white p-6 min-h-screen">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}

