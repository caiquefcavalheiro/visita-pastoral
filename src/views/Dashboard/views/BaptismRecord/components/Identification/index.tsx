import { Box, Center, Heading, VStack } from "native-base";
import CustomInput from "../../../../../../components/customInput";
import { CustomRadio } from "../customRadio";
import { Masks } from "react-native-mask-input";
import { useFormContext } from "react-hook-form";
import { memo } from "react";

function Identification() {
  const {
    formState: { errors },
    control,
  } = useFormContext();
  return (
    <Box>
      <Center w="100%">
        <Heading fontSize="30" color="blue.300">
          Identificação
        </Heading>

        <VStack space="15" mt="10" w="100%">
          <CustomInput
            label="Nome (sem abreviações)"
            error={errors?.name}
            control={control}
            name="name"
          />
          <CustomInput
            label="Sobrenome (sem abreviações)"
            error={errors?.lastName}
            control={control}
            name="lastName"
          />

          <CustomInput
            label="Data de nascimento"
            error={errors?.birthDate}
            name="birthDate"
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

          <CustomRadio
            options={[
              { value: "Masculino", label: "Masculino" },
              { value: "Feminino", label: "Feminino" },
            ]}
            radioGroupProps={{
              name: "test",
              w: "100%",
            }}
            label="Sexo do candidato"
            error={errors?.sex}
            control={control}
            name="sex"
          />

          <CustomRadio
            options={[
              { value: "Solteiro", label: "Solteiro" },
              { value: "Divorciado", label: "Divorciado" },
              { value: "Viúvo", label: "Viúvo" },
              { value: "Casado", label: "Casado" },
            ]}
            radioGroupProps={{
              name: "test",
              w: "100%",
            }}
            label="Estado civil"
            error={errors?.maritalStatus}
            control={control}
            name="maritalStatus"
          />

          <CustomInput
            label="Data casamento civil"
            error={errors?.civilMarriageDate}
            name="civilMarriageDate"
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
            label="Religião anterior"
            error={errors?.previousReligion}
            name="previousReligion"
            control={control}
          />

          <CustomInput
            label="Cidade, UF, país de nascimento"
            error={errors?.countryOfBirth}
            name="countryOfBirth"
            control={control}
          />

          <CustomInput
            label="Nome da mãe"
            error={errors?.motherName}
            name="motherName"
            control={control}
          />

          <CustomInput
            label="Doc. Identificação / Órgão Emissor / UF (Mãe)"
            error={errors?.motherIdentificationDoc}
            name="motherIdentificationDoc"
            control={control}
          />

          <CustomInput
            label="Nome do pai"
            error={errors?.fatherName}
            name="fatherName"
            control={control}
          />

          <CustomInput
            label="Doc. Identificação / Órgão Emissor / UF (Pai)"
            error={errors?.fatherIdentificationDoc}
            name="fatherIdentificationDoc"
            control={control}
          />
          <CustomInput
            label="Endereço residencial completo"
            error={errors?.fullResidentialAddress}
            name="fullResidentialAddress"
            control={control}
          />

          <CustomInput
            label="Bairro"
            error={errors?.neighborhood}
            name="neighborhood"
            control={control}
          />

          <CustomInput
            label="Cidade, UF, país da residência"
            error={errors?.countryOfResidence}
            name="countryOfResidence"
            control={control}
          />

          <CustomInput
            label="CEP"
            error={errors?.cep}
            name="cep"
            control={control}
            keyboardType="numeric"
            mask={Masks.ZIP_CODE}
            rules={{
              required: false,
              minLength: {
                value: 9,
                message: "O CEP deve ter no mínimo 8 dígito",
              },
            }}
          />
          <CustomInput
            label="Telefone"
            error={errors?.phone}
            name="phone"
            keyboardType="numeric"
            control={control}
            mask={Masks.BRL_PHONE}
          />
          <CustomInput
            label="E-mail"
            error={errors?.email}
            name="email"
            control={control}
          />
          <CustomInput
            label="Doc. Identificação / Órgão Emissor / UF"
            error={errors?.rg}
            name="rg"
            control={control}
          />
        </VStack>
      </Center>
    </Box>
  );
}

export default memo(Identification);
