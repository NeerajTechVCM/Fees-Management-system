import { Book, Calendar, ChevronUp, DollarSign, DollarSignIcon, Home, Inbox, PlusCircle, Search, Settings, User, User2, UserRoundPen } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useAuth } from "@/context/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "All Courses",
    url: "/allCourses",
    icon: Book,
  },
  {
    title: "Add Courses",
    url: "/addCourses",
    icon: PlusCircle,
  },
  {
    title: "All students",
    url: "/allStudents",
    icon: User,
  },
  {
    title: "Add Students",
    url: "/addStudents",
    icon: User2,
  },
  {
    title: "Collect Fees",
    url: "/collectfees",
    icon: DollarSign,
  },
  {
    title: "Payment History",
    url: "/paymentHistory",
    icon:UserRoundPen,
  },
]

export function AppSidebar() {
  const [auth,setAuth] = useAuth();
return (
  <Sidebar variant="sidebar" collapsible="icon" className="h-screen shadow-lg">
    {/* Sidebar Content */}
    <SidebarContent className="bg-gray-900 text-gray-100">
      <SidebarGroup>
        <SidebarGroupLabel className="text-2xl font-bold mb-6 px-4 py-2 tracking-wide text-white">
          Fees Dashboard
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="space-y-1">
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a
                    href={item.url}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                  >
                    <item.icon className="w-5 h-5 text-indigo-400" />
                    <span className="font-medium">{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    {/* Sidebar Footer */}
<SidebarFooter className="bg-gray-800 p-1 flex justify-center">
  <div className="flex items-center gap-3">
    <Avatar className="w-10 h-10 ring-2 ring-indigo-400">
      <AvatarImage src={auth ? auth.users.profile : ""} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <span className="font-semibold text-white truncate  md:inline">
      {auth ? auth.users.name : "Username"}
    </span>
  </div>
</SidebarFooter>



  </Sidebar>
);



}
