import { MainLayout } from "@/components/Layouts";
import { HomePage } from "@/pages";
import { createBrowserRouter } from "react-router-dom";


export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "home",
        element: <HomePage />
      }
    ]
  }
])