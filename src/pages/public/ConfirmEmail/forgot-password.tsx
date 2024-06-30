import { BasicFormProviderZod, ButtonForm } from "@/components";
import { InputForm } from "@/composables";
import { useResetPasswordMutation, useSendEmailRecovryPasswordQuery } from "@/domain/graphql";
import { ToastyErrorGraph } from "@/lib/utils";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
export const ForgotPasswordPage = () => {
  const { token } = useParams<{ token: string }>();

  const passwordSchema = z.object({
    email: z.string().email("email invalido")
    });
   type PasswordForm = z.infer<typeof passwordSchema>;
   const onSubmit = async (data1: PasswordForm) => {

    try {
      toast.info("Enviando email...")
      const {data, loading} = useSendEmailRecovryPasswordQuery({
        variables: {
            email: data1.email
        },
      });
      if(loading) return
      if (!!data?.sendEmailRecovryPassword) {
        toast.error("¡Oops, hubo un error")
        return
      }

      toast.success("Email enviado con exito")
      setTimeout(()=> {
        window.location.href="/"
      }, 500)

    } catch (error) {
      ToastyErrorGraph(error as any)
    }
  }  
  return (
    <Card x-chunk="dashboard-12-chunk-3">
    <CardHeader>
      <CardTitle>Enviar Correo</CardTitle>
      <CardDescription>
        Aqui puedes enviar el correo para restablecer tu contraseña recuerda no compartirla, ni darla en ningún sitio <br></br><br></br>
      </CardDescription>
    </CardHeader>
    <CardContent>
    <BasicFormProviderZod submit={onSubmit} schema={passwordSchema}>
        <InputForm name='email' label={"email"} />
        <ButtonForm>Enviar correo</ButtonForm>
    </BasicFormProviderZod>
    </CardContent>
  </Card>
  ) 
  
}