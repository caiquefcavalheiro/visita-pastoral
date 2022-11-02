import { Box, ScrollView, Text, useToast, VStack } from "native-base";
import ButtonDefault from "../../components/button";
import { Header } from "../../components/Header";

import { useCustomToast } from "../../hooks";
import Identification from "./components/Identification";
import Conversion from "./components/Conversion";
import DeclarationOfFaith from "./components/DeclarationOfFaith";
import InformationAboutTheSheet from "./components/informationAboutTheSheet";
import { memo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import Ceremony from "./components/ceremony";
import { defaultValues } from "./defaultValue";

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
  specialVote?: boolean;
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

function Baptism({ navigation }: any) {
  const toast = useToast();

  const { handleSubmit } = useFormContext();

  function handleSubmitData(data: any) {
    useCustomToast({
      toast,
      msg: "Dados cadastrados com sucesso!",
      type: "sucess",
    });
    navigation.navigate("Signatures", { baptismRecordData: data });
  }

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
}

function BaptismRecord({ navigation }: any) {
  const methods = useForm<BaptismRecordData>({
    defaultValues,
  });

  return (
    <>
      <FormProvider {...methods}>
        <Baptism navigation={navigation} />
      </FormProvider>
    </>
  );
}

export default memo(BaptismRecord);
