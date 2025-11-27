import { Link } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuItem } from "./ui/sidebar";

export default function AppSidebar(){
    return(

        <Sidebar>
            <SidebarHeader>Presidente Prudente Clima</SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
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