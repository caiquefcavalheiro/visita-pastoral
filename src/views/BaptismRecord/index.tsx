import { Box, ScrollView, Text, useToast, VStack } from "native-base";
import ButtonDefault from "../../components/button";
import { Header } from "../../components/Header";

import { useCustomToast } from "../../hooks";
import Identification from "./components/Identification";
import Conversion from "./components/Conversion";
import DeclarationOfFaith from "./components/DeclarationOfFaith";
import { useNavigation } from "@react-navigation/native";
import InformationAboutTheSheet from "./components/informationAboutTheSheet";
import { memo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

const Form = () => {
  const toast = useToast();

  const { handleSubmit } = useFormContext();

  const { navigate } = useNavigation();

  const handleSubmitData = (data: any) => {
    console.log(data, "data");
    useCustomToast({
      toast,
      msg: "Dados cadastrados com sucesso!",
      type: "sucess",
    });
    navigate("Signatures" as never);
  };

  return (
    <>
      <Box w="100%" h="100%" bg="gray.200">
        <Header title="Ficha de Batismo" path="Dashboard" />
        <ScrollView>
          <Box px="16" py="20">
            <VStack space="20">
              <InformationAboutTheSheet />
              <Identification />
              <Conversion />
              <DeclarationOfFaith />
            </VStack>

            <ButtonDefault
              buttonProps={{
                width: "100%",
                mt: 100,
                onPress: handleSubmit(handleSubmitData),
              }}
            >
              <Text fontSize="20" fontWeight="semibold" color="white">
                Ir para as assinaturas
              </Text>
            </ButtonDefault>
          </Box>
        </ScrollView>
      </Box>
    </>
  );
};

const Baptism = memo(Form);

const BaptismRecord = () => {
  const methods = useForm();
  return (
    <>
      <FormProvider {...methods}>
        <Baptism />
      </FormProvider>
    </>
  );
};

export default memo(BaptismRecord);
