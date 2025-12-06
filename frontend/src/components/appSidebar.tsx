import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "./ui/sidebar";
import { useAuth } from "./../../contexts/AuthContext";
import { Button } from "./ui/button";
import { CloudSun, Laugh, LogOut, Users } from "lucide-react";

export default function AppSidebar() {
  const { usuario, sair } = useAuth();

  return (
    <Sidebar className="border-r bg-white shadow-sm">
      <SidebarHeader className="px-4 py-5 text-xl font-bold text-gray-800">
        Presidente Prudente Clima
      </SidebarHeader>

      <SidebarContent className="flex flex-col gap-6 px-3">
        

        {usuario && (
          <div className="flex items-center rounded-2xl gap-2 p-3  bg-gray-100">
            <span className="font-semibold text-gray-800">{usuario.email}</span>
            <Button variant="destructive" onClick={sair}>
              <LogOut />
            </Button>
          </div>
        )}


        <SidebarGroup>
          <SidebarMenu className="flex flex-col gap-1">
            
            <SidebarMenuItem>
                <Link
                    to="/"
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 font-medium text-gray-700"
                >
                    <CloudSun />
                    Clima
                </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
                <Link
                    to="/usuarios"
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 font-medium text-gray-700"
                >
                    <Users />
                    Usuários
                </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
                <Link
                    to="/explorar"
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 font-medium text-gray-700"
                >
                    <Laugh />
                    Explorar
                </Link>
            </SidebarMenuItem>

          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 text-xs text-gray-400">
        © {new Date().getFullYear()} — PP Clima
      </SidebarFooter>
    </Sidebar>
  );
}
