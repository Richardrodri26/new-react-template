
import { Outlet } from "react-router-dom"
import { AsideMenu } from "../AsideMenu"



export const MainLayout = () => {
  return (
    <main className="flex min-h-screen w-full flex-col bg-muted/40">
      
      <AsideMenu />
      <Outlet />
    </main>
  )
}
