import { ModalContent } from "@/composables/CustomModal"
import useGeneral from "@/domain/store/general.store";
import { CreateClient } from "./CreateClient";
import { UpdateClient } from "./UpdateClient";


export const ClientModals = () => {
  const modalStatus = useGeneral(s => s.modalStatus);

  const modalId = modalStatus?.id
  return (
    <ModalContent>

      {(
        {
          "createPresupuesto": <CreateClient />,
          "updatePresupuesto": <UpdateClient />
        }[modalId || ""] || <></>
      )}

    </ModalContent>
  )
}