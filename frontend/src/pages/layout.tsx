import type { ReactNode } from "react";


import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import AppSidebar from "../components/appSidebar";

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <SidebarProvider className="flex h-screen w-screen bg-gray-50">
            <div className="flex h-full w-full">

                <AppSidebar />


                <main className="flex flex-col flex-1 h-full w-full overflow-auto p-4">
  
                    <SidebarTrigger className="mb-4 self-start" />
                    

                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}
