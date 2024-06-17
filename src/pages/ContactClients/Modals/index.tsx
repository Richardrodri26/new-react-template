import { ModalContent } from "@/composables/CustomModal"
import useGeneral from "@/domain/store/general.store";
import { CreateClientContact } from "./CreateClientContact";
import { UpdateClientContact } from "./UpdateClientContact";


export const ClientContactModals = () => {
  const modalStatus = useGeneral(s => s.modalStatus);

  const modalId = modalStatus?.id
  return (
    <ModalContent>

      {(
        {
          "createClientContact": <CreateClientContact />,
          "updateClientContact": <UpdateClientContact />
        }[modalId || ""] || <></>
      )}

    </ModalContent>
  )
}