import { ModalContent } from "@/composables/CustomModal"
import useGeneral from "@/domain/store/general.store";
import { CreateTypeVisit } from "./CreateTypeVisit";
// import { UpdateUser } from "./UpdateUser";


export const TypeVistModals = () => {
  const modalStatus = useGeneral(s => s.modalStatus);

  const modalId = modalStatus?.id
  return (
    <ModalContent>

      {(
        {
          "createTypeVisit": <CreateTypeVisit />,
          // "updateUser": <UpdateUser />
        }[modalId || ""] || <></>
      )}

    </ModalContent>
  )
}