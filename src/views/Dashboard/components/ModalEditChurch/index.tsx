import { Center, HStack, Text, useToast } from "native-base";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ButtonDefault from "../../../../components/button";
import { CustomDialog } from "../../../../components/CustomDialog";
import CustomInput from "../../../../components/customInput";
import { CustomModal } from "../../../../components/customModal";
import ImageInput from "../../../../components/imageInput";
import { useDatabaseConnection } from "../../../../database/connection";
import { ChurchModel } from "../../../../database/entities/FamilieChurchPersonSermon";
import useChurchService from "../../../../database/services/churchService";
import { useCustomToast } from "../../../../hooks";

interface ModalEditChurchProps {
  open: boolean;
  onClose: () => void;
  church?: ChurchModel;
  handleEdit?: (newChurch: ChurchModel) => void;
}

type ModalChurchData = {
  name: string;
  image: string;
};

export const ModalEditChurch = ({
  open,
  onClose,
  church,
  handleEdit,
}: ModalEditChurchProps) => {
  const [isOpenDeleteMsg, setIsOpenDeleteMsg] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ModalChurchData>();

  const toast = useToast();

  const { connection } = useDatabaseConnection();

  const Church = useChurchService(connection);

  const onSubmit = async (data: ModalChurchData) => {
    const { name, image } = data;

    if (church?.id) {
      const newChurch = await Church.update(church?.id, { name, image });
      useCustomToast({
        msg: "Igreja atualizada com sucesso !",
        toast,
        type: "sucess",
      });
      if (newChurch) {
        handleEdit?.(newChurch);
      }
    }
    onClose();
  };

  const handleDeleteChurch = async () => {
    if (church?.id) {
      await Church.deleteChurch(church.id);
    }
  };

  useEffect(() => {
    if (church) {
      reset({
        ...church,
      });
    }
  }, [church]);

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      placement="center"
      header="Editar igreja"
      headerProps={{
        borderBottomWidth: 0,
      }}
      textProps={{
        fontWeight: "bold",
        fontSize: "16",
      }}
      contentStyle={{
        w: "95%",
      }}
      Content={
        <Center w="100%">
          <HStack w="100%" alignItems="flex-end" space={3}>
            <ImageInput
              rules={{ required: "A imagem da igreja é obrigatório !" }}
              control={control}
              name="image"
              error={errors?.image}
              textProps={{
                fontSize: 16,
                color: "black",
              }}
            />

            <CustomInput
              name="name"
              control={control}
              placeholder="Escreva o nome da igreja"
              rules={{ required: "Este campo é obrigatório" }}
              error={errors?.name}
              label="Nome da igreja"
              labelProps={{
                fontSize: 12,
                pl: 2,
              }}
              inputProps={{
                pt: 0,
                pb: 0,
                height: "12",
                borderRadius: "8",
                fontSize: "11",
                bgColor: "gray.500",
                borderColor: "gray.500",
                placeholderTextColor: "black",
                w: "52%",
              }}
            />
          </HStack>

          <HStack space={4}>
            <ButtonDefault
              buttonProps={{
                onPress: handleSubmit(onSubmit),
                width: "150",
                mt: 10,
                bg: "blue.400",
              }}
            >
              <Text fontSize="18" fontWeight="bold" color="white">
                Salvar
              </Text>
            </ButtonDefault>
            <ButtonDefault
              buttonProps={{
                onPress: () => {
                  setIsOpenDeleteMsg(true);
                },
                width: "150",
                mt: 10,
                bg: "red.400",
              }}
            >
              <Text fontSize="18" fontWeight="bold" color="white">
                Deletar
              </Text>
            </ButtonDefault>
          </HStack>
          <CustomDialog
            setIsOpen={setIsOpenDeleteMsg}
            showTrigger={false}
            content={<Text>Tem certeza que deseja deletar esta igreja ?</Text>}
            cancelMsg="Não"
            sucessMsg="Sim"
            onSuccess={() => {
              handleDeleteChurch();
              onClose();
              setIsOpenDeleteMsg(false);
            }}
            isOpen={isOpenDeleteMsg}
            onCancel={() => {
              setIsOpenDeleteMsg(false);
            }}
          />
        </Center>
      }
    />
  );
};
