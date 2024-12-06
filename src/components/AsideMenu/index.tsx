import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Package2, Home, ShoppingCart, Package, Users2, LineChart, Settings, Goal, PanelLeft, Calendar, PersonStanding, MapPinIcon, Bolt, Users } from "lucide-react"
import { Fragment } from "react/jsx-runtime";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

interface IAsideMenuItem {
  title: string;
  url: string;
  icon: JSX.Element;
};

const asideMenuItems: IAsideMenuItem[] = [
  {
    title: "Visitas",
    url: "/dashboard",
    icon: <MapPinIcon className="h-5 w-5" />
  },
  {
    title: "Calendario de visitas",
    url: "/dashboard/calendar",
    icon: <Calendar className="h-5 w-5"></Calendar>
  },
  {
    title: "Calendario de compromisos",
    url: "/dashboard/calendar2",
    icon: <Calendar className="h-5 w-5"></Calendar>
  },
  {
    title: "Clientes",
    url: "/dashboard/clients",
    icon: <PersonStanding className="h-5 w-5" />
  },
  {
    title: "Usuarios",
    url: "/dashboard/users",
    icon: <Users2 className="h-5 w-5" />
  },
  // {
  //   title: "Contactos",
  //   url: "/dashboard/contactsClient",
  //   icon: <Users className="h-5 w-5" />
  // },
  {
    title: "Tipo de visita",
    url: "/dashboard/typeVisit",
    icon: <Bolt className="h-5 w-5"></Bolt>
  },
  
  {
    title: "Reportes",
    url: "/dashboard/reports",
    icon: <LineChart className="h-5 w-5" />
  },
]

export const AsideMenu = () => {

  return (
    <aside className="min-w-14 flex-row border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          to="/dashboard"
          className="group flex px-2.5 h-9 min-w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:min-w-8 md:text-base"
        >
          <Home className="h-4 w-4 transition-all group-hover:scale-110" />
          <p>SELLER</p>
          <span className="sr-only">Seller</span>
        </Link>
        {
          asideMenuItems.map((item) => (
            <Fragment key={item.url}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.url}
                      className="flex h-9 min-w-9 w-full items-center justify-start gap-5 rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:min-w-8"
                    >
                      {/* <Home className="h-5 w-5" /> */}
                      {item.icon}
                      {item.title}
                      <span className="sr-only">{item.title}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.title}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Fragment>
          ))
        }
        {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Orders</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right">Orders</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Package className="h-5 w-5" />
                  <span className="sr-only">Products</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right">Products</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">Customers</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right">Customers</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LineChart className="h-5 w-5" />
                  <span className="sr-only">Analytics</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right">Analytics</TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="/dashboard/parameters"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Parametros</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right" >Parametros</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  )
}


export const AsideMenuMobile = () => {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          {/* <a
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </a>
            <a
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
              Orders
            </a>
            <a
              href="#"
              className="flex items-center gap-4 px-2.5 text-foreground"
            >
              <Package className="h-5 w-5" />
              Products
            </a>
            <a
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Users2 className="h-5 w-5" />
              Customers
            </a>
            <a
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              Settings
            </a> */}

          {
            asideMenuItems.map((item) => (
              <Fragment key={item.url}>
                <Link
                  to={item.url}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  {/* <Home className="h-5 w-5" /> */}
                  {item.icon}
                  <span className="sr-only">{item.title}</span>
                </Link>
              </Fragment>
            ))
          }

        </nav>
      </SheetContent>
    </Sheet>
  )
}