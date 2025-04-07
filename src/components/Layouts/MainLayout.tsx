
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import { AsideMenu } from "../AsideMenu"
import { useShallowGeneralStore } from "@/domain/store/general.store";
import { User, useValidateUserTokenQuery } from "@/domain/graphql";
import Cookies from 'js-cookie'
import { FloatingButton } from "../Utils/FloatingButton";
import { CircleUser, MessageCircle, Phone, Plus, Settings } from "lucide-react";



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

export const AppGuardLayout = () => {
  const [setLoginUser, logout, isLogged] = useShallowGeneralStore((state) => [
    state.setLoginUser,
    state.logout,
    state.isLogged,
  ]);
  const navigate = useNavigate();
  const location = useLocation();

  const { loading } = useValidateUserTokenQuery({
    variables: {
      validateTokenInput: {
        token: Cookies.get(import.meta.env.VITE_APP_KEY_COOKIE_SESSION) ?? "",
      },
    },
    onCompleted: (data) => {
      setLoginUser(data.validateUserToken as User);
    },
    onError: (error) => {
      console.log("error", error);
      navigate("/");
      logout();
    },
    fetchPolicy: "network-only",
  });

  if (loading)
    return (
      <div className="h-screen w-screen flex justify-center items-center flex-col">
        <img src="/loading.svg" alt="" />
        <span>Cargando recursos</span>
      </div>
    );

  // if (isLogged === false) return <Navigate to={"/"} />;

  if (true)
    return (
      <>
        {/* <Outlet />
        {location.pathname.includes(routerPaths.admin.path) ? null : (
          <Navigate to={routerPaths.admin.path} />
        )} */}

        <main className="flex min-h-screen w-full flex-row bg-muted/40 ml-5">

          <AsideMenu />
          <div className="flex min-h-screen w-full flex-col bg-muted/40">

            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
              <Outlet />
              <FloatingButton
                position="bottom-right"
                className="bg-primary text-primary-foreground"
                icon={Plus}
                showText
                text="Nuevo"
                subButtons={[
                  {
                    icon: CircleUser,
                    text: "Entrar como trabjador",
                    onClick: () => window.open(
                      `https://intranet.cytech.net.co:3000/looger/${Cookies.get(import.meta.env.VITE_APP_KEY_COOKIE_SESSION) ?? "eyyy.jbvdbdbbjsdbjsjbibvjasbvjsdvjav"}`,
                      '_blank' // Esto hace que se abra en una nueva pestaña/ventana
                    )
                  },
                ]}
              />
            </div>
          </div>
        </main>
      </>
    );

  return <Outlet />;
};