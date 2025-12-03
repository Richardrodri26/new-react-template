import { Download } from "lucide-react";
import { toast } from "sonner";

export const BotonDescargarExcel = () => {

  const descargarExcel = async () => {
    const toastId = toast.info("Descargando archivo...");
    try {
      // Obtener el archivo de Excel
      const response = await fetch(`${import.meta.env.VITE_APP_MICRO_GRAPH}ventas/export`, {
        method: "GET",
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "reporte.xlsx";
      link.click(); // dispara la descarga

      // Limpieza
      window.URL.revokeObjectURL(url);

    } catch (error) {
      toast.error("Error descargando Excel");
      console.error("Error descargando Excel:", error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <button
      onClick={descargarExcel}
      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition"
    >
      <Download size={20} />
      Descargar relación de existencias
    </button>
  );
};
