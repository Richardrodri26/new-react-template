import React, { Fragment, useRef, useState, useEffect } from 'react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Home, Users2, MapPinIcon, Settings, PanelLeft, PersonStanding, Calendar, Map, HandCoinsIcon, Car, Bolt, Archive, FileArchive, SwatchBook } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface IAsideMenuItem {
  title: string;
  url: string;
  icon: JSX.Element;
  submenu?: IAsideMenuItem[];
}

const asideMenuItems: IAsideMenuItem[] = [
  {
    title: "Reportes",
    url: "/dashboard/reports",
    icon: <Home className="h-5 w-5" />
  },
  {
    title: "Visitas",
    url: "/dashboard/visit",
    icon: <MapPinIcon className="h-5 w-5" />,

  },
  {
    title: "Calendarios",
    url: "calendarios",
    icon: <Calendar className="h-5 w-5"></Calendar>,
    submenu: [
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
    ]
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
  {
    title: "Stock",
    url: "/dashboard/stock",
    icon: <SwatchBook className="h-5 w-5" />
  },
  {
    title: "Mapa",
    url: "/dashboard/mapaApp",
    icon: <Map className="h-5 w-5" />
  },
  {
    title: "Comisiones",
    url: "/dashboard/commissions",
    icon: <HandCoinsIcon className="h-5 w-5" />
  },
  {
    title: "Fletes",
    url: "/dashboard/fletes",
    icon: <Car className="h-5 w-5" />
  },
  {
    title: "Proyectos",
    url: "/dashboard/proyectos",
    icon: <FileArchive className="h-5 w-5" />
  },
  {
    title: "Tipo de visita",
    url: "/dashboard/typeVisit",
    icon: <Bolt className="h-5 w-5"></Bolt>
  },
  {
    title: 'Reportes',
    url: 'reportes',
    icon: <Archive className="h-5 w-5" ></Archive>,
    submenu: [
      {
        title: 'Reporte de commscope',
        url: '/dashboard/reportCommscope',
        icon: <Archive className="h-5 w-5" ></Archive>
      },
      {
        title: 'Reporte de commscope Pos',
        url: '/dashboard/reportCommscopePos',
        icon: <Archive className="h-5 w-5" ></Archive>
      },
    ]
  },
  {
    title: 'Configuración',
    url: '/dashboard/parameters',
    icon: <Settings className="h-5 w-5"/>
  }
]
export const AsideMenu = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpenMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-10 flex flex-col border-r bg-background transition-all duration-300",
        isExpanded ? "w-64" : "w-14"
      )}
      ref={menuRef}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Título fijo */}
      {/* <div className="flex h-16 items-center border-b px-4">
        <Link 
          to="/dashboard"
          className="flex items-center gap-2 whitespace-nowrap font-semibold"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Home className="h-5 w-5 text-primary-foreground" />
          </div>
          {isExpanded && <span className="ml-2">CYTech SAS</span>}
        </Link>
      </div> */}

      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {asideMenuItems.map((item) => (
          <Fragment key={item.url}>
            {item.submenu ? (
              <div className="relative mb-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setOpenMenu(openMenu === item.url ? null : item.url)}
                        className={cn(
                          "flex w-full items-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                          location.pathname.startsWith(item.url) && "bg-accent text-accent-foreground",
                          isExpanded ? "justify-start gap-3" : "justify-center"
                        )}
                      >
                        {item.icon}
                        {isExpanded && <span>{item.title}</span>}
                        {!isExpanded && <span className="sr-only">{item.title}</span>}
                      </button>
                    </TooltipTrigger>
                    {!isExpanded && <TooltipContent side="right">{item.title}</TooltipContent>}
                  </Tooltip>
                </TooltipProvider>

                {openMenu === item.url && !isExpanded && (
                  <div className="absolute left-full top-0 z-20 ml-1 w-48 rounded-md border bg-popover shadow-lg">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.url}
                        to={subItem.url}
                        className={cn(
                          "flex items-center p-3 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                          location.pathname === subItem.url && "bg-accent text-accent-foreground"
                        )}
                      >
                        {subItem.icon}
                        <span className="ml-2">{subItem.title}</span>
                      </Link>
                    ))}
                  </div>
                )}

                {isExpanded && openMenu === item.url && (
                  <div className="ml-2 mt-1 space-y-1 border-l-2 pl-2">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.url}
                        to={subItem.url}
                        className={cn(
                          "flex items-center rounded-lg p-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                          location.pathname === subItem.url && "bg-accent text-accent-foreground",
                          isExpanded ? "justify-start gap-3" : "justify-center"
                        )}
                      >
                        {subItem.icon}
                        {isExpanded && <span>{subItem.title}</span>}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.url}
                      className={cn(
                        "flex items-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                        location.pathname === item.url && "bg-accent text-accent-foreground",
                        isExpanded ? "justify-start gap-3" : "justify-center",
                        "mb-1"
                      )}
                    >
                      {item.icon}
                      {isExpanded && <span>{item.title}</span>}
                      {!isExpanded && <span className="sr-only">{item.title}</span>}
                    </Link>
                  </TooltipTrigger>
                  {!isExpanded && <TooltipContent side="right">{item.title}</TooltipContent>}
                </Tooltip>
              </TooltipProvider>
            )}
          </Fragment>
        ))}
      </nav>

      {/* Configuración en la parte inferior */}
      {/* <div className="border-t p-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/dashboard/parameters"
                className={cn(
                  "flex items-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                  location.pathname === "/dashboard/parameters" && "bg-accent text-accent-foreground",
                  isExpanded ? "justify-start gap-3" : "justify-center"
                )}
              >
                <Settings className="h-5 w-5" />
                {isExpanded && <span>Configuración</span>}
                {!isExpanded && <span className="sr-only">Configuración</span>}
              </Link>
            </TooltipTrigger>
            {!isExpanded && <TooltipContent side="right">Configuración</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
      </div> */}
    </aside>
  );
};

export const AsideMenuMobile = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const location = useLocation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <div className="flex h-16 items-center border-b px-4">
          <Link 
            to="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Home className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="ml-2">CYTech SAS</span>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          {asideMenuItems.map((item) => (
            <Fragment key={item.url}>
              {item.submenu ? (
                <div className="px-2">
                  <button
                    onClick={() => setOpenMenu(openMenu === item.url ? null : item.url)}
                    className={cn(
                      "flex w-full items-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                      location.pathname.startsWith(item.url) && "bg-accent text-accent-foreground"
                    )}
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                  </button>
                  {openMenu === item.url && (
                    <div className="ml-6 mt-1 space-y-1 border-l-2 pl-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.url}
                          to={subItem.url}
                          className={cn(
                            "flex items-center rounded-lg p-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                            location.pathname === subItem.url && "bg-accent text-accent-foreground"
                          )}
                        >
                          {subItem.icon}
                          <span className="ml-3">{subItem.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.url}
                  className={cn(
                    "flex items-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                    location.pathname === item.url && "bg-accent text-accent-foreground",
                    "mx-2 mb-1"
                  )}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              )}
            </Fragment>
          ))}
        </nav>

        <div className="border-t p-2">
          <Link
            to="/dashboard/parameters"
            className={cn(
              "flex items-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
              location.pathname === "/dashboard/parameters" && "bg-accent text-accent-foreground"
            )}
          >
            <Settings className="h-5 w-5" />
            <span className="ml-3">Configuración</span>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};