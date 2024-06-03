
import { Outlet } from "react-router-dom"
import { AsideMenu } from "../AsideMenu"



export const MainLayout = () => {
  return (
    <main className="flex min-h-screen w-full flex-col bg-muted/40">

      <AsideMenu />
      <div className="flex min-h-screen w-full flex-col bg-muted/40">

        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Outlet />

        </div>
      </div>
    </main>
  )
}
