import { ModalContent } from "@/composables/CustomModal"
import useGeneral from "@/domain/store/general.store";
import { CreateUser } from "./CreateUser";
import { UpdateUser } from "./UpdateUser";


export const UsersModals = () => {
  const modalStatus = useGeneral(s => s.modalStatus);

  const modalId = modalStatus?.id
  return (
    <ModalContent>

      {(
        {
          "createUser": <CreateUser />,
          "updateUser": <UpdateUser />
        }[modalId || ""] || <></>
      )}

    </ModalContent>
  )
}