import { ModalContent } from "@/composables/CustomModal"
import useGeneral from "@/domain/store/general.store";
import { CreateParameter } from "./Create";
import { UpdateParameter } from "./UpdateParameter";


export const TipoProyectoModals = () => {
  const modalStatus = useGeneral(s => s.modalStatus);

  const modalId = modalStatus?.id
  return (
    <ModalContent>

      {(
        {
          "createTipoProyecto": <CreateParameter />,
          "updateTipoProyecto": <UpdateParameter />
        }[modalId || ""] || <></>
      )}

    </ModalContent>
  )
}