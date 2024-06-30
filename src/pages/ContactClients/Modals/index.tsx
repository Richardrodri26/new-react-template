import { ModalContent } from "@/composables/CustomModal"
import useGeneral from "@/domain/store/general.store";
import { CreateClientContact } from "./CreateClientContact";
import { UpdateClientContact } from "./UpdateClientContact";


export const ClientContactModals = ({id}: {id?: string}) => {
  const modalStatus = useGeneral(s => s.modalStatus);

  const modalId = modalStatus?.id
  const idClient = modalStatus?.content?.idClient

  return (
    <ModalContent>

      {(
        {
          "createClientContact": <CreateClientContact id={idClient || ""} />,
          "updateClientContact": <UpdateClientContact id={idClient || ""} />
        }[modalId || ""] || <></>
      )}

    </ModalContent>
  )
}