import { Link } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuItem } from "./ui/sidebar";
import { useAuth } from "./../../contexts/AuthContext";
import { Button } from "./ui/button";

export default function AppSidebar(){
    const { usuario, sair } = useAuth();
    return(
        
        <Sidebar>
            <SidebarHeader>Presidente Prudente Clima</SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {
                            usuario? 
                                <div className="flex flex-row justify-between">
                                    <SidebarMenuItem className="font-bold">{usuario.email}</SidebarMenuItem>
                                    <Button variant={"ghost"} onClick={sair}>Sair</Button>
                                </div>
                            : 
                                <></>
                        }
                        <SidebarMenuItem>
                            <Link to={"/"}>Clima</Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <Link to={"/usuarios"}>Usuarios</Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <Link to={"/explorar"}>Explorar</Link>
                        </SidebarMenuItem>
            
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
  
    )
}