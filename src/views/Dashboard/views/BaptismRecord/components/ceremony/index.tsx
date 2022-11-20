import { Box, Center, Heading, VStack } from "native-base";
import CustomInput from "../../../../../../components/customInput";
import { DateTimeInput } from "../../../../../../components/dateTimeInput";
import { useFormContext } from "react-hook-form";
import { memo } from "react";

function Ceremony() {
  const {
    formState: { errors },
    control,
  } = useFormContext();
  return (
    <Box>
      <Center w="100%">
        <Heading fontSize="30" color="blue.300">
          Cerimônia
        </Heading>

        <VStack space="15" mt="10" w="100%">
          <CustomInput
            label="Local, cidade/UF da cerimônia"
            error={errors?.ceremonyLocation}
            control={control}
            name="ceremonyLocation"
          />
          <CustomInput
            label="Nome completo do pastor oficiante"
            error={errors?.fullNameOfficiatingPastor}
            control={control}
            name="fullNameOfficiatingPastor"
          />

          <CustomInput
            label="Nome da igreja/grupo que o/a recebeu como membro"
            error={errors?.nameTheChurch}
            name="nameTheChurch"
            control={control}
          />

          <CustomInput
            label="Cidade/UF da igreja/grupo organizado"
            error={errors?.cityChurchOrganizedGroup}
            name="cityChurchOrganizedGroup"
            control={control}
          />

          <DateTimeInput
            label="Data e voto da Reunião Regular/Administrativa"
            error={errors?.dateAndCoteTheAdministrativeMeeting}
            name="dateAndCoteTheAdministrativeMeeting"
            control={control}
          />

          <CustomInput
            label="Nome secretário/a da igreja/grupo organizado"
            error={errors?.nameSecretaryOrganizedGroup}
            name="nameSecretaryOrganizedGroup"
            control={control}
          />
        </VStack>
      </Center>
    </Box>
  );
}

export default memo(Ceremony);
