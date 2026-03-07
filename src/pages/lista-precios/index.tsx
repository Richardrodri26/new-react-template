import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { PhoneIcon } from "lucide-react";
import { GroupsUtilidadTable } from "./GroupsUtilidadTable";

const API_BASE_URL = (import.meta.env.VITE_APP_GRAPH || "http://localhost:3002").replace(/\/$/, "");

export const ListaPreciosPage = () => {
  const [isWhatsappModalOpen, setIsWhatsappModalOpen] = useState(false);
  const [whatsappPhone, setWhatsappPhone] = useState("");
  const [whatsappMessage, setWhatsappMessage] = useState("");
  const [isSendingWhatsapp, setIsSendingWhatsapp] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2">
          <h1 className="text-3xl font-semibold">Lista de precios</h1>
          <Button onClick={() => setIsWhatsappModalOpen(true)}>
            <PhoneIcon className="mr-2 h-4 w-4" />
            WhatsApp
          </Button>
        </div>
        <div className="mx-auto grid w-full max-w-6xl gap-4">
          <GroupsUtilidadTable />
        </div>
      </main>

      <Dialog open={isWhatsappModalOpen} onOpenChange={setIsWhatsappModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enviar WhatsApp</DialogTitle>
            <DialogDescription>
              Ingresa el numero obligatorio y un mensaje opcional.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">Numero</label>
              <Input
                value={whatsappPhone}
                onChange={(e) => setWhatsappPhone(e.target.value)}
                placeholder="573001112233"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Mensaje (opcional)</label>
              <Textarea
                value={whatsappMessage}
                onChange={(e) => setWhatsappMessage(e.target.value)}
                placeholder="Hola, te contacto desde CYTech"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsWhatsappModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              disabled={isSendingWhatsapp}
              onClick={async () => {
                const cleanPhone = whatsappPhone.replace(/[^\d]/g, "");
                if (!cleanPhone) {
                  toast.error("El numero de WhatsApp es obligatorio.");
                  return;
                }

                try {
                  setIsSendingWhatsapp(true);
                  const response = await fetch(`${API_BASE_URL}/lista-precio/admin/send/number`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      accept: "*/*",
                    },
                    body: JSON.stringify({
                      phone: cleanPhone,
                      message: whatsappMessage.trim() || undefined,
                    }),
                  });

                  if (!response.ok) {
                    throw new Error("No fue posible enviar el mensaje de WhatsApp.");
                  }

                  toast.success("Mensaje enviado por WhatsApp.");
                  setIsWhatsappModalOpen(false);
                  setWhatsappPhone("");
                  setWhatsappMessage("");
                } catch (error) {
                  const message = error instanceof Error ? error.message : "Error enviando WhatsApp.";
                  toast.error(message);
                } finally {
                  setIsSendingWhatsapp(false);
                }
              }}
            >
              {isSendingWhatsapp ? "Enviando..." : "Enviar WhatsApp"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
