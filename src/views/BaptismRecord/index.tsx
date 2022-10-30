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
import { setStorage } from "../../utils/storage";
import Ceremony from "./components/ceremony";

export type BaptismRecordData = {
  action: string;
  birthDate: string;
  cep: string;
  churchWhereHeWasAmember: string;
  civilMarriageDate: string;
  countryOfBirth: string;
  decidingBaptized: string;
  declaration0: string;
  declaration1: string;
  declaration10: string;
  declaration11: string;
  declaration12: string;
  declaration2: string;
  declaration3: string;
  declaration4: string;
  declaration5: string;
  declaration6: string;
  declaration7: string;
  declaration8: string;
  declaration9: string;
  email: string;
  firstBibleInstructor: string;
  howDidSDA: string;
  howYouStudyBible: string;
  lastName: string;
  maritalStatus: string;
  name: string;
  otherDecidingBaptized: string;
  otherHowDidSDA: string;
  otherHowYouStudyBible: string;
  phone: string;
  previousReligion: string;
  reason: string;
  removalDate: string;
  rg: string;
  secondBibleInstructor: string;
  sex: string;
  specialVote: true;
  theChurchWasConsulted: string;
  motherName: string;
  fatherName: string;
  fullResidentialAddress: string;
  neighborhood: string;
  countryOfResidence: string;
  ceremonyLocation: string;
  fullNameOfficiatingPastor: string;
  nameTheChurch: string;
  cityChurchOrganizedGroup: string;
  dateAndCoteTheAdministrativeMeeting: string;
  nameSecretaryOrganizedGroup: string;
};

const Form = () => {
  const toast = useToast();

  const { handleSubmit } = useFormContext();

  const { navigate } = useNavigation();

  const handleSubmitData = async (data: any) => {
    await setStorage("@pastoral:baptismRecordData", data);
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
              <Ceremony />
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
  const methods = useForm<BaptismRecordData>();
  return (
    <>
      <FormProvider {...methods}>
        <Baptism />
      </FormProvider>
    </>
  );
};

export default memo(BaptismRecord);
