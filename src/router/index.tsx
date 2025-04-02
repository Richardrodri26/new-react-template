import { AppGuardLayout, MainLayout } from "@/components/Layouts";
import { ClientsEditPage, ClientsPage, ContactClientsPage, FletesPage, HomePage, LoginPage, ParametersPage, UsersPage, VisitsPage } from "@/pages";
import { CommissionsPage } from "@/pages/Commissions";
import FletesPageAdmin from "@/pages/Fletes/admin/fletesPage";
import FletesPageBodega from "@/pages/Fletes/bodega";
import { ComisionByUserPage } from "@/pages/Fletes/comisionByUser";
import MapaApp from "@/pages/Mapa";
import { CommissionsConfigPage } from "@/pages/Parameters/comision";
import ReportsPage from "@/pages/Reports";
import { VisitDetailPage } from "@/pages/Visits/Detalle";
import { LoagerPage } from "@/pages/auth/looager";
import { HomeBlog } from "@/pages/blog";
import CalendarPage from "@/pages/calendar";
import CalendarPage2 from "@/pages/calendar2";
import ReportInventoryCommscope from "@/pages/inventory/inventory";
import TablaFacturas from "@/pages/inventory/inventoryPos";
import { MarcaPoryectoPage } from "@/pages/marcaProyecto";
import { PresupuestoPage } from "@/pages/presupuesto";
import {ConfirmEmailPage} from "@/pages/public/ConfirmEmail";
import { ForgotPasswordPage } from "@/pages/public/ConfirmEmail/forgot-password";
import {ResetPasswordPage} from "@/pages/public/ConfirmEmail/resetPassword";
import { TipoPoryectoPage } from "@/pages/typeProyect";
import { TypeVistPage } from "@/pages/typeVisit";
import { createBrowserRouter } from "react-router-dom";
export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,

  },
  {
    path: "/looger/:token",
    element: <LoagerPage />,
  },
  {
    path: "/dashboard",
    element: <AppGuardLayout />,
    children: [
      {
        path: "reports", // Ruta para el detalle de la visita con su ID
        element: <ReportsPage />,
      },
      // {
      //   path: "",
      //   element: <HomePage />
      // }
      {
        path: "visit",
        element: <VisitsPage />
      },
      {
        path: "users",
        element: <UsersPage />
      },
      {
        path: "parameters",
        element: <ParametersPage />
      },
      {
        path: "parameters-comision",
        element: <CommissionsConfigPage />
      },
      {
        path: "comision-by-user",
        element: <ComisionByUserPage />
      },
      {
        path: "clients",
        element: <ClientsPage />
      },
      {
        path: "clients/edit/:id",
        element: <ClientsEditPage />
      },
      {
        path: "typeVisit",
        element: <TypeVistPage/>
      },
      {
        path: "calendar",
        element: <CalendarPage/>
      },
      {
        path: "calendar2",
        element: <CalendarPage2/>
      },
      {
        path: "visit/:id", // Ruta para el detalle de la visita con su ID
        element: <VisitDetailPage />,
      },
      {
        path: "contactsClient", // Ruta para el detalle de la visita con su ID
        element: <ContactClientsPage id="" />,
      },
      {
        path: "commissions", // Ruta para el detalle de la visita con su ID
        element: <ComisionByUserPage/>,
      },
      {
        path: "fletes", // Ruta para el detalle de la visita con su ID
        element: <FletesPage/>,
      },
      {
        path: 'mapaApp',
        element: <MapaApp/>
      },
      {
        path: 'reportCommscope',
        element: <ReportInventoryCommscope/>
      },
      {
        path: 'reportCommscopePos',
        element: <TablaFacturas/>
      },
      {
        path: 'typeProyect',
        element: <TipoPoryectoPage />
      },
      {
        path: 'marcaProyect',
        element: <MarcaPoryectoPage />
      },
      {
        path: 'presupuesto',
        element: <PresupuestoPage />
      }
    ]
  },
  {
    path: '/public',
    children: [
      {
        path: 'confimEmail/:state/:id/:token',
        element: <ConfirmEmailPage></ConfirmEmailPage>
      }
    ]
  }, 
  {
    path: '/resetPassword/:token',
    element: <ResetPasswordPage/>
  },
  {
    path: 'forgot-password',
    element: <ForgotPasswordPage/>
  },
  {
    path:"/fletes",
    children: [
      {
        path: "",
        element: <FletesPageBodega/>
      }
    ]
  }
])