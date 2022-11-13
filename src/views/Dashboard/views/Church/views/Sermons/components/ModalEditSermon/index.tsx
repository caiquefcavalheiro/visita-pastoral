import dayjs from "dayjs";
import { useToast, VStack } from "native-base";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ButtonDefault from "../../../../../../../../components/button";
import CustomInput from "../../../../../../../../components/customInput";
import { CustomModal } from "../../../../../../../../components/customModal";
import CustomTextArea from "../../../../../../../../components/CustomTextArea";
import { useDatabaseConnection } from "../../../../../../../../database/connection";
import { SermonModel } from "../../../../../../../../database/entities/FamilieChurchPersonSermon";
import useSermonService from "../../../../../../../../database/services/sermonService";
import { useCustomToast } from "../../../../../../../../hooks";

interface Props {
  open: boolean;
  onClose: () => void;
  handleAdd: () => void;
  sermon: SermonModel;
}

export const ModalEditSermon = ({
  open,
  onClose,
  handleAdd,
  sermon,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const toast = useToast();

  const { connection } = useDatabaseConnection();
  const Sermon = useSermonService(connection);

  const onSubmit = async (data: any) => {
    const newData = {} as Partial<SermonModel>;
    if (data.description) newData.description = data.description;
    if (data.name) newData.name = data.name;

    await Sermon.update(sermon.id, newData).then((response) => {
      useCustomToast({
        msg: "Sermão atualizado!!",
        toast,
        type: "sucess",
      });

      handleAdd();
      onClose();
      reset();
    });
  };

  useEffect(() => {
    reset({
      name: sermon.name,
      description: sermon.description,
    });
  }, [sermon]);

  const handleDelete = async () => {
    await Sermon.deleteSermon(sermon.id).then((response) => {
      useCustomToast({
        msg: "Sermão apagado!!",
        toast,
        type: "sucess",
      });

      handleAdd();
      onClose();
    });
  };

  const formatDate = dayjs(sermon.createdAt).format("DD/MM/YYYY");

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      placement="center"
      header={`${formatDate} - ${sermon.name}`}
      headerProps={{
        borderBottomWidth: 0,
      }}
      textProps={{
        fontWeight: "bold",
        fontSize: "16",
      }}
      Content={
        <VStack space={4}>
          <CustomInput
            name="name"
            value={sermon.name}
            control={control}
            placeholder="Titulo do sermão"
            error={errors?.name}
            inputProps={{
              pt: 0,
              pb: 0,
              height: "12",
              borderRadius: "8",
              fontSize: "16",
              bgColor: "gray.500",
              borderColor: "gray.500",
              placeholderTextColor: "black",
            }}
          />
          <CustomTextArea
            name="description"
            value={sermon.description}
            control={control}
            error={errors?.description}
            textAreaProps={{
              minHeight: "400",
              pt: 0,
              pb: 0,
              height: "12",
              borderRadius: "8",
              fontSize: "16",
              bgColor: "gray.500",
              borderColor: "gray.500",
              placeholderTextColor: "black",
              placeholder: "Informações do sermão",
            }}
          />
          <VStack display="flex" flexDir={"row"} space={4}>
            <ButtonDefault
              buttonProps={{
                onPress: async () => await handleDelete(),
                backgroundColor: "red.500",
                width: "40%",
              }}
            >
              Deletar
            </ButtonDefault>
            <ButtonDefault
              buttonProps={{ onPress: handleSubmit(onSubmit), width: "40%" }}
            >
              Editar
            </ButtonDefault>
          </VStack>
        </VStack>
      }
    />
  );
};
