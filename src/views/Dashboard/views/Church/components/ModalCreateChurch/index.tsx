import { Input } from "native-base";
import ButtonDefault from "../../../../../../components/button";
import { CustomModal } from "../../../../../../components/customModal";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ModalCreateChurch = ({ open, onClose }: Props) => {
  return (
    <>
      <CustomModal
        open={open}
        onClose={onClose}
        placement="center"
        header="Adicionar Igreja"
        Content={
          <>
            <Input placeholder="Nome da Igreja" />
            <ButtonDefault>Adicionar</ButtonDefault>
          </>
        }
      ></CustomModal>
    </>
  );
};
