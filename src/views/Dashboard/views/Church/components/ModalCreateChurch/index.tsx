import { Ionicons } from "@expo/vector-icons";
import { Box, Center, VStack } from "native-base";
import { useForm } from "react-hook-form";
import ButtonDefault from "../../../../../../components/button";
import CustomInput from "../../../../../../components/customInput";
import { CustomModal } from "../../../../../../components/customModal";
import ImageButton from "../../../../../../components/imageButton";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ModalCreateChurch = ({ open, onClose }: Props) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      placement="center"
      header="Adicionar Igreja"
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
            placeholder="Nome da Igreja"
            rules={{ required: "Este campo é obrigatório" }}
          />
          <ImageButton
            rules={{ required: "Este campo é obrigatório" }}
            control={control}
            name="image"
            textButton="Escolher Foto"
            textProps={{
              fontSize: 16,
              color: "black",
            }}
            buttonStyles={{
              pt: 0,
              pb: 0,
              backgroundColor: "gray.500",
              borderColor: "gray.500",
              endIcon: (
                <Center ml="4">
                  <Ionicons
                    color="black"
                    size={20}
                    name="cloud-upload-outline"
                  />
                </Center>
              ),
            }}
          />
          <ButtonDefault
            buttonProps={{ onPress: handleSubmit(onSubmit), width: "100%" }}
          >
            Adicionar
          </ButtonDefault>
        </VStack>
      }
    />
  );
};
