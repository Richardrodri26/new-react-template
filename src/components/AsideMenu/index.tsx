import { useState, useEffect } from "react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Package2, Home, ShoppingCart, Package, Users2, LineChart, Settings, Goal, PanelLeft, Calendar, PersonStanding, MapPinIcon, Bolt, Users, HandCoinsIcon, Map, Car, Archive, Pin, PinOff } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface IAsideMenuItem {
  title: string;
  url: string;
  icon: JSX.Element;
};

const asideMenuItems: IAsideMenuItem[] = [
  {
    title: "Reportes",
    url: "/dashboard/reports",
    icon: <Home className="h-5 w-5" />
  },
  {
    title: "Visitas",
    url: "/dashboard/visit",
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
    title: "Tipo de visita",
    url: "/dashboard/typeVisit",
    icon: <Bolt className="h-5 w-5"></Bolt>
  },
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
  {
    title: 'Configuración',
    url: '/dashboard/parameters',
    icon: <Settings className="h-5 w-5"/>
  }
]


export const AsideMenu = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPinned, setIsPinned] = useState(() => {
    // Recuperar preferencia de localStorage si existe
    return localStorage.getItem('menuPinned') === 'true';
  });
  const location = useLocation();
  const navigate = useNavigate();

  // Efecto para manejar el pinned state
  useEffect(() => {
    localStorage.setItem('menuPinned', String(isPinned));
    if (isPinned) {
      setIsExpanded(true);
    }
  }, [isPinned]);

  // Manejar el hover
  const handleMouseEnter = () => {
    if (!isPinned) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isPinned) {
      setIsExpanded(false);
    }
  };

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r bg-background transition-all duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-20"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex h-full flex-col">
        {/* Menú principal */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {asideMenuItems.map((item) => (
              <li key={item.url}>
                <Link
                  to={item.url}
                  className={cn(
                    "group flex items-center rounded-lg p-3 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                    location.pathname === item.url && "bg-accent text-accent-foreground",
                    isExpanded ? "justify-start gap-3" : "justify-center"
                  )}
                >
                  <div className="flex-shrink-0">
                    {item.icon}
                  </div>
                  {isExpanded && (
                    <span className="whitespace-nowrap transition-opacity duration-200">
                      {item.title}
                    </span>
                  )}
                  {!isExpanded && (
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="sr-only">{item.title}</span>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          {item.title}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Menú inferior (configuración) */}
        {/* <nav className="px-3 pb-4">
          <Link
            to="/dashboard/parameters"
            className={cn(
              "group flex items-center rounded-lg p-3 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
              location.pathname === "/dashboard/parameters" && "bg-accent text-accent-foreground",
              isExpanded ? "justify-start gap-3" : "justify-center"
            )}
          >
            <Settings className="h-5 w-5" />
            {isExpanded && (
              <span className="whitespace-nowrap">Configuración</span>
            )}
            {!isExpanded && (
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="sr-only">Configuración</span>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Configuración
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </Link>
        </nav> */}
      </div>
    </aside>
  );
};

export const AsideMenuMobile = () => {
  const location = useLocation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <div className="flex h-full flex-col">
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              {asideMenuItems.map((item) => (
                <li key={item.url}>
                  <Link
                    to={item.url}
                    className={cn(
                      "flex items-center gap-3 rounded-lg p-3 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                      location.pathname === item.url && "bg-accent text-accent-foreground"
                    )}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
{/* 
          <nav className="px-3 pb-4">
            <Link
              to="/dashboard/parameters"
              className={cn(
                "flex items-center gap-3 rounded-lg p-3 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                location.pathname === "/dashboard/parameters" && "bg-accent text-accent-foreground"
              )}
            >
              <Settings className="h-5 w-5" />
              <span>Configuración</span>
            </Link>
          </nav> */}
        </div>
      </SheetContent>
    </Sheet>
  );
};