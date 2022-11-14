import { useToast, VStack } from "native-base";
import { useForm } from "react-hook-form";
import ButtonDefault from "../../../../../../../../components/button";
import CustomInput from "../../../../../../../../components/customInput";
import { CustomModal } from "../../../../../../../../components/customModal";
import CustomTextArea from "../../../../../../../../components/CustomTextArea";
import { useDatabaseConnection } from "../../../../../../../../database/connection";
import { ChurchModel } from "../../../../../../../../database/entities/FamilieChurchPersonSermon";
import useSermonService from "../../../../../../../../database/services/sermonService";
import { useCustomToast } from "../../../../../../../../hooks";

interface Props {
  open: boolean;
  onClose: () => void;
  handleAdd: () => void;
  church: ChurchModel;
}

export const ModalCreateSermon = ({
  open,
  onClose,
  handleAdd,
  church,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toast = useToast();

  const { connection } = useDatabaseConnection();
  const Sermon = useSermonService(connection);

  const onSubmit = async (data: any) => {
    await Sermon.create(data, church.id).then(() => {
      useCustomToast({
        msg: "Sermão adicionado!!",
        toast,
        type: "sucess",
      });

      handleAdd();
      onClose();
    });
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      placement="center"
      header="Adicionar novo sermão"
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
            control={control}
            placeholder="Titulo do sermão"
            rules={{ required: "Este campo é obrigatório" }}
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
            control={control}
            rules={{ required: "Este campo é obrigatório" }}
            error={errors?.description}
            textAreaProps={{
              pt: 0,
              pb: 0,
              borderRadius: "8",
              fontSize: "16",
              bgColor: "gray.500",
              borderColor: "gray.500",
              placeholderTextColor: "black",
              placeholder: "Informações do sermão",
              totalLines: 100,
              multiline: true,
              numberOfLines: 100,
              maxLength: 100,
              maxFontSizeMultiplier: 100,
              h: 400,
            }}
          />

          <ButtonDefault
            buttonProps={{
              onPress: handleSubmit(onSubmit),
              width: "100%",
            }}
          >
            Salvar
          </ButtonDefault>
        </VStack>
      }
    />
  );
};
