import { AppGuardLayout, MainLayout } from "@/components/Layouts";
import { ClientsEditPage, ClientsPage, ContactClientsPage, FletesPage, HomePage, LoginPage, ParametersPage, UsersPage, VisitsPage } from "@/pages";
import { CommissionsPage } from "@/pages/Commissions";
import FletesPageAdmin from "@/pages/Fletes/admin/fletesPage";
import MapaApp from "@/pages/Mapa";
import ReportsPage from "@/pages/Reports";
import { VisitDetailPage } from "@/pages/Visits/Detalle";
import { HomeBlog } from "@/pages/blog";
import CalendarPage from "@/pages/calendar";
import CalendarPage2 from "@/pages/calendar2";
import {ConfirmEmailPage} from "@/pages/public/ConfirmEmail";
import { ForgotPasswordPage } from "@/pages/public/ConfirmEmail/forgot-password";
import {ResetPasswordPage} from "@/pages/public/ConfirmEmail/resetPassword";
import { TypeVistPage } from "@/pages/typeVisit";
import { createBrowserRouter } from "react-router-dom";
export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,

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
        element: <CommissionsPage/>,
      },
      {
        path: "fletes", // Ruta para el detalle de la visita con su ID
        element: <FletesPageAdmin/>,
      },
      {
        path: 'mapaApp',
        element: <MapaApp/>
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
        element: <FletesPage/>
      }
    ]
  }
])