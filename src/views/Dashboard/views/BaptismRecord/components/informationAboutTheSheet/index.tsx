import { Box, Center, Heading, VStack } from "native-base";
import CustomInput from "../../../../../../components/customInput";
import { CustomRadio } from "../customRadio";
import { CustomCheckBox } from "../../../../../../components/customCheckBox";
import { useFormContext } from "react-hook-form";
import { memo } from "react";
import { Masks } from "react-native-mask-input";

function InformationAboutTheSheet() {
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
          />

          <CustomCheckBox
            label="Anexar a ficha de “Pedido de Batismo por Voto Especial” aprovado pela Comissão Diretiva do Campo local"
            text="Voto especial"
            control={control}
            name="specialVote"
          />

          <CustomInput
            label="Motivo"
            error={errors?.reason}
            name="reason"
            control={control}
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
          />

          <CustomInput
            label="Data da remoção"
            error={errors?.removalDate}
            name="removalDate"
            control={control}
            keyboardType="numeric"
            mask={Masks.DATE_DDMMYYYY}
            rules={{
              required: false,
              pattern: {
                value: /^\d{2}\/\d{2}\/\d{4}$/,
                message: "Digite uma data valida !",
              },
            }}
          />

          <CustomInput
            label="Igreja/grupo e localidade onde foi membro"
            error={errors?.churchWhereHeWasAmember}
            name="churchWhereHeWasAmember"
            control={control}
          />
        </VStack>
      </Center>
    </Box>
  );
}

export default memo(InformationAboutTheSheet);
