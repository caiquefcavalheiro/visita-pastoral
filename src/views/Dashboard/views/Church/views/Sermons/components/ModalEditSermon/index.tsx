import dayjs from "dayjs";
import { useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
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
  const [editing, setEditing] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const toast = useToast();

  const { connection } = useDatabaseConnection();
  const Sermon = useSermonService(connection);

  const onSubmit = async (data: any) => {
    const newData = {} as Partial<SermonModel>;
    if (data.description) newData.description = data.description;
    if (data.name) newData.name = data.name;

    await Sermon.update(sermon.id, newData).then((response) => {
      useCustomToast({
        msg: "Sermão atualizado com sucesso!",
        toast,
        type: "sucess",
      });

      setEditing(false);

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

  const formatDate = dayjs(sermon.createdAt).format("DD/MM/YYYY");

  return (
    <CustomModal
      open={open}
      onClose={() => {
        setEditing(false);
        onClose();
      }}
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
            isEditable={editing}
          />
          <CustomTextArea
            name="description"
            control={control}
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
              isDisabled: !editing,
            }}
          />
          <VStack display="flex" flexDir={"row"} space={4}>
            {editing ? (
              <ButtonDefault
                buttonProps={{
                  onPress: handleSubmit(onSubmit),
                  width: "100%",
                }}
              >
                Salvar
              </ButtonDefault>
            ) : (
              <ButtonDefault
                buttonProps={{
                  onPress: () => {
                    setEditing(!editing);
                  },
                  width: "100%",
                }}
              >
                Editar
              </ButtonDefault>
            )}
          </VStack>
        </VStack>
      }
    />
  );
};
