import { Feather } from "@expo/vector-icons";
import {
  Box,
  Center,
  Heading,
  HStack,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import AppendButton from "../../../../components/AppendButton";
import ButtonDefault from "../../../../components/button";
import CustomInput from "../../../../components/customInput";
import { CustomModal } from "../../../../components/customModal";
import ImageInput from "../../../../components/imageInput";
import { useDatabaseConnection } from "../../../../database/connection";
import {
  ChurchModel,
  FamilieModel,
} from "../../../../database/entities/FamilieChurchPersonSermon";
import useFamilieService from "../../../../database/services/familieService";
import usePersonService from "../../../../database/services/personService";
import { useCustomToast } from "../../../../hooks";

interface ModalCreateFamilieProps {
  open: boolean;
  onClose: () => void;
  church?: ChurchModel;
  currentFamilie?: FamilieModel;
  defaultValues?: ModalFamilieData;
  handleSave?: () => void;
}

type ModalFamilieData = {
  persons: { name: string; id: string; idDb?: string }[];
  name: string;
  image: string;
};

export const ModalCreateFamilie = ({
  open,
  onClose,
  church,
  defaultValues,
  currentFamilie,
  handleSave,
}: ModalCreateFamilieProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ModalFamilieData>();

  const toast = useToast();

  const { connection } = useDatabaseConnection();

  const familie = useFamilieService(connection);
  const person = usePersonService(connection);

  const onSubmit = async (data: ModalFamilieData) => {
    const { name, image, persons } = data;

    if (church?.id) {
      const newFamilie = await familie.create({ name, image }, church.id);

      await Promise.all(
        persons.map(async ({ name }) => {
          return await person.create({ name }, newFamilie.id);
        })
      );

      useCustomToast({
        msg: "Família criada com sucesso !",
        toast,
        type: "sucess",
      });
    } else if (currentFamilie?.id) {
      await familie.update(currentFamilie?.id, { name, image });

      await Promise.all(
        persons.map(async ({ name, id, idDb }) => {
          if (idDb) {
            return await person.update(id, { name });
          } else {
            return await person.create({ name }, currentFamilie.id);
          }
        })
      );

      useCustomToast({
        msg: "Família editada com sucesso !",
        toast,
        type: "sucess",
      });
    }

    handleSave?.();
    onClose();
  };

  const { fields, append, remove } = useFieldArray({
    name: "persons",
    control,
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        persons: defaultValues?.persons.map((person) => ({
          ...person,
          idDb: person.id,
        })),
      });
    }
  }, [defaultValues]);

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      placement="center"
      header="Adicionar família"
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
              rules={{ required: "A imagem da familia é obrigatório !" }}
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
              placeholder="Escreva o nome da familia"
              rules={{ required: "Este campo é obrigatório" }}
              error={errors?.name}
              label="Nome da familia"
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

          <Heading color="blue.300" my={5}>
            Integrantes da familia
          </Heading>

          <VStack w="100%" px="12%" mb={5} space={2}>
            {fields.map((item, index) => (
              <HStack w="100%" alignItems="center" space={2} key={item?.id}>
                <Box w="85%">
                  <CustomInput
                    name={`persons.${index}.name`}
                    control={control}
                    placeholder="Nome do integrante"
                    rules={{ required: "Este campo é obrigatório" }}
                    error={errors?.persons?.[index]?.name}
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
                    }}
                  />
                </Box>

                <TouchableOpacity
                  onPress={async () => {
                    remove(index);
                    if (item?.idDb) {
                      await person.deletePerson(item.idDb);
                    }
                  }}
                >
                  <Feather name="trash" size={30} color="#9D0518" />
                </TouchableOpacity>
              </HStack>
            ))}
          </VStack>

          <AppendButton
            bgColor="blue.400"
            text="Adicionar novo integrante"
            textProps={{
              ml: 3,
            }}
            appendButtonProps={{
              onPress: () => {
                append({ name: "", id: "" });
              },
            }}
          />

          <ButtonDefault
            buttonProps={{
              onPress: handleSubmit(onSubmit),
              width: "100%",
              mt: 10,
            }}
          >
            <Text fontSize="18" fontWeight="semibold" color="white">
              Salvar
            </Text>
          </ButtonDefault>
        </Center>
      }
    />
  );
};
