import { Box, Center, Heading, VStack } from "native-base";
import CustomInput from "../../../../components/customInput";
import { DateTimeInput } from "../../../../components/dateTimeInput";
import { CustomRadio } from "../customRadio";
import { CustomCheckBox } from "../../../../components/customCheckBox";
import { useFormContext } from "react-hook-form";

const InformationAboutTheSheet = () => {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <Box>
      <Center w="100%">
        <Heading fontSize="30" color="blue.300">
          Informações sobre a ficha
        </Heading>

        <VStack space="15" mt="10" w="100%">
          <CustomRadio
            options={[
              { value: "Batismo", label: "Batismo" },
              { value: "Rebatismo*", label: "Rebatismo*" },
              { value: "Profissão de fé*", label: "Profissão de fé*" },
            ]}
            radioGroupProps={{
              name: "test",
              w: "100%",
            }}
            label="Ação"
            error={errors?.action}
            control={control}
            name="action"
            rules={{ required: "Este campo é obrigatório!" }}
          />

          <CustomCheckBox
            label="Anexar a ficha de “Pedido de Batismo por Voto Especial” aprovado pela Comissão Diretiva do Campo local"
            text="Voto especial"
            control={control}
            name="tess"
          />

          <CustomInput
            label="Motivo"
            error={errors?.reason}
            name="reason"
            control={control}
            rules={{ required: "Este campo é obrigatório!" }}
          />

          <CustomRadio
            options={[
              { value: "Sim", label: "Sim" },
              { value: "Não", label: "Não" },
            ]}
            radioGroupProps={{
              name: "test",
              w: "100%",
            }}
            label="Foi consultada a igreja/grupo ou o pastor onde o/a candidato/a foi removido/a?"
            error={errors?.theChurchWasConsulted}
            control={control}
            name="theChurchWasConsulted"
            rules={{ required: "Este campo é obrigatório!" }}
          />

          <DateTimeInput
            label="Data da remoção"
            error={errors?.removalDate}
            name="removalDate"
            control={control}
            rules={{ required: "Este campo é obrigatório!" }}
          />

          <CustomInput
            label="greja/grupo e localidade onde foi membro"
            error={errors?.churchWhereHeWasAmember}
            name="churchWhereHeWasAmember"
            control={control}
            rules={{ required: "Este campo é obrigatório!" }}
          />
        </VStack>
      </Center>
    </Box>
  );
};

export default InformationAboutTheSheet;
