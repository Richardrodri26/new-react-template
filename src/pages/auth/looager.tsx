import { BasicFormProviderZod, ButtonForm } from "@/components"
import { Label } from "@/components/ui/label"
import { InputForm } from "@/composables"
import { loginSchema, loginSchemaType } from "./controller/schemas"
import { login } from "@/domain/store/general.actions"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner";
import Cookies from 'js-cookie'
import { IGeneral, setter, useShallowGeneralStore } from "@/domain/store/general.store"
import { produce } from "immer"
import { useEffect } from "react"
import { User, useValidateUserTokenQuery } from "@/domain/graphql"

export function LoagerPage() {
  const [setLoginUser, logout, isLogged] = useShallowGeneralStore((state) => [
    state.setLoginUser,
    state.logout,
    state.isLogged,
  ]);
  const navigate = useNavigate()
  const { token } = useParams()
  // Cookies.remove(import.meta.env.VITE_APP_KEY_COOKIE_SESSION)
  // Cookies.remove(import.meta.env.VITE_APP_KEY_COOKIE_USER)
  const { loading } = useValidateUserTokenQuery({
    variables: {
      validateTokenInput: {
        token: token ?? "",
      },
    },
    onCompleted: (data) => {
      setLoginUser(data.validateUserToken as User);
      Cookies.set(import.meta.env.VITE_APP_KEY_COOKIE_SESSION, token || '')
      Cookies.set(import.meta.env.VITE_APP_KEY_COOKIE_USER, JSON.stringify(data.validateUserToken))
      navigate("/dashboard/reports")
    },
    onError: (error) => {
      console.log("error", error);
      navigate("/");
    },
    fetchPolicy: "network-only",
  });


  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
      <img src="/loading.svg" alt="" />
      <span>Loagendo a super admin</span>
    </div>
  );
}
