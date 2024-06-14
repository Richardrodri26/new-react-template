import { ModalContent } from "@/composables/CustomModal"
import useGeneral from "@/domain/store/general.store";
import { CreateParameter } from "./CreateParameter";
import { UpdateParameter } from "./UpdateParameter";


export const ParameterModals = () => {
  const modalStatus = useGeneral(s => s.modalStatus);

  const modalId = modalStatus?.id
  return (
    <ModalContent>

      {(
        {
          "createParameter": <CreateParameter />,
          "updateParameter": <UpdateParameter />
        }[modalId || ""] || <></>
      )}

    </ModalContent>
  )
}