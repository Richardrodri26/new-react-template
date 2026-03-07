import { Outlet, useNavigate } from "react-router-dom"
import { AsideMenu } from "../AsideMenu"
import { useShallowGeneralStore } from "@/domain/store/general.store";
import { User, useValidateUserTokenQuery } from "@/domain/graphql";
import Cookies from "js-cookie"
import { FloatingButton } from "../Utils/FloatingButton";
import { ArrowUpFromLine, CircleUser, PhoneIcon, Plus } from "lucide-react";
import ScrollToTop from "../Utils/ScrollToTop";

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
  const [setLoginUser, logout] = useShallowGeneralStore((state) => [
    state.setLoginUser,
    state.logout,
  ]);
  const navigate = useNavigate();

  const { loading } = useValidateUserTokenQuery({
    variables: {
      validateTokenInput: {
        token: Cookies.get(import.meta.env.VITE_APP_KEY_COOKIE_SESSION) ?? "",
      },
    },
    onCompleted: (data) => {
      setLoginUser(data.validateUserToken as User);
    },
    onError: () => {
      navigate("/");
      logout();
    },
    fetchPolicy: "network-only",
  });

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center flex-col">
        <img src="/loading.svg" alt="" />
        <span>Cargando recursos</span>
      </div>
    );
  }

  return (
    <>
      <main className="flex min-h-screen w-full flex-row bg-muted/40 ml-5">
        <AsideMenu />
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <ScrollToTop />
            <Outlet />
            <FloatingButton
              className="bg-primary text-primary-foreground"
              icon={Plus}
              showText
              text="Nuevo"
              subButtons={[
                {
                  icon: CircleUser,
                  text: "Entrar como trabajador",
                  onClick: () =>
                    window.open(
                      `https://intranet.cytech.net.co:3000/looger/${Cookies.get(import.meta.env.VITE_APP_KEY_COOKIE_SESSION) ?? "eyyy.jbvdbdbbjsdbjsjbibvjasbvjsdvjav"}`,
                      "_blank"
                    ),
                },
                {
                  icon: ArrowUpFromLine,
                  text: "Entrar al archer",
                  onClick: () => window.open("https://intranet.cytech.net.co:8080", "_blank"),
                },
                {
                  icon: PhoneIcon,
                  text: "Entrar al WhatsApp",
                  onClick: () => window.open("https://web.whatsapp.com/", "_blank"),
                },
              ]}
            />
          </div>
        </div>
      </main>
    </>
  );
};
