import { BasicFormProviderZod, ButtonForm } from "@/components"
import { Label } from "@/components/ui/label"
import { InputForm } from "@/composables"
import { loginSchema, loginSchemaType } from "./controller/schemas"
import { login } from "@/domain/store/general.actions"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner";
export function LoginPage() {
  const navigate = useNavigate()

  const onSubmit = async (data: loginSchemaType) => {
    if(data.password?.length < 8){
      toast.error("Min length caracter to password 8");
      return
    }
    const resLogin = await login(data);

    if(resLogin) {
      navigate("/dashboard")
    }

  }

  return (
    <div className="w-full h-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        {/* <div className="mx-auto grid w-[350px] gap-6"> */}

        <BasicFormProviderZod submit={onSubmit} schema={loginSchema} className="mx-auto grid w-[350px] gap-6">
          
        

          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Inicio de sesión</h1>
            <p className="text-balance text-muted-foreground">
              Ingresa tu correo para acceder a tu cuenta
            </p>
          </div>
          <div className="grid gap-4">

            

            <InputForm name="email" label="Email" />

            <InputForm name="password" label={<div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
                <a
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>} />

            <ButtonForm className="w-full">
              Iniciar sesión
            </ButtonForm>
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            ¿No tienes una cuenta?{" "}
            <a href="#" className="underline">
              Registrate
            </a>
          </div>
          </BasicFormProviderZod>
        {/* </div> */}
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/img-service-optimize.jpg"
          alt="img"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
