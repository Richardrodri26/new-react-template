import { BasicFormProviderZod, ButtonForm } from "@/components";
import { InputForm } from "@/composables";
import { useResetPasswordMutation } from "@/domain/graphql";
import { ToastyErrorGraph } from "@/lib/utils";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { publicGraph } from "@/domain/api.config";
import { gql } from "@apollo/client";

const passwordSchema = z.object({
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres')
        .regex(/[A-Z]/, 'La contraseña debe tener al menos una letra mayúscula')
        .regex(/[@$!%*?&]/, 'La contraseña debe tener al menos un carácter especial'),
});

type PasswordForm = z.infer<typeof passwordSchema>;

export const ResetPasswordPage = () => {
    const { token } = useParams<{ token: string }>();
    const [resetPasswordMutation] = useResetPasswordMutation();
    const [showPassword, setShowPassword] = useState(false);
    const ResetPasswordDocument = gql`
        mutation ResetPassword($password: String!) {
    resetPassword(password: $password) {
        email
    }
    }
        `
    const onSubmit = async (data: PasswordForm) => {
        try {
            toast.info("Actualizando contraseña...");
            publicGraph.setHeader("Authorization", "Bearer " + token!)
            const response = await publicGraph.request(ResetPasswordDocument,{
                password: data.password
            }) as any
            // return response
            // const resMutation = await resetPasswordMutation({

            // });

            if (response["errors"]) {
                toast.error("¡Oops, hubo un error!");
                return;
            }

            toast.success("Contraseña actualizada con éxito");
            setTimeout(() => {
                window.location.href = "/";
            }, 500);

        } catch (error) {
            ToastyErrorGraph(error as any);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Restablecer la contraseña</CardTitle>
                <CardDescription>
                    Aquí puedes restablecer tu contraseña, recuerda no compartirla ni darla en ningún sitio.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <BasicFormProviderZod submit={onSubmit} schema={passwordSchema}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <InputForm name="password" label="Nueva contraseña" type={showPassword ? "text" : "password"} />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                cursor: "pointer",
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                    </div>
                    <ButtonForm>Restablecer contraseña</ButtonForm>
                </BasicFormProviderZod>
            </CardContent>
        </Card>
    );
}
