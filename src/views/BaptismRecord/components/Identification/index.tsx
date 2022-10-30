import { Box, Center, Heading, VStack } from "native-base";
import CustomInput from "../../../../components/customInput";
import { DateTimeInput } from "../../../../components/dateTimeInput";
import { CustomRadio } from "../customRadio";
import { Masks } from "react-native-mask-input";
import { useFormContext } from "react-hook-form";

const Identification = () => {
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
            rules={{ required: "Este campo é obrigatório!" }}
          />
          <CustomInput
            label="Sobrenome (sem abreviações)"
            error={errors?.lastName}
            control={control}
            name="lastName"
            rules={{ required: "Este campo é obrigatório!" }}
          />

          <DateTimeInput
            label="Data de nascimento"
            error={errors?.birthDate}
            name="birthDate"
            control={control}
            rules={{ required: "Este campo é obrigatório!" }}
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
            rules={{ required: "Este campo é obrigatório!" }}
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
            rules={{ required: "Este campo é obrigatório!" }}
          />

          <DateTimeInput
            label="Data casamento civil"
            error={errors?.civilMarriageDate}
            name="civilMarriageDate"
            control={control}
            rules={{ required: "Este campo é obrigatório!" }}
          />

          <CustomInput
            label="Religião anterior"
            error={errors?.previousReligion}
            name="previousReligion"
            control={control}
            rules={{ required: "Este campo é obrigatório!" }}
          />

          <CustomInput
            label="Cidade, UF, país de nascimento"
            error={errors?.countryOfBirth}
            name="countryOfBirth"
            control={control}
            rules={{ required: "Este campo é obrigatório!" }}
          />
          <CustomInput
            label="CEP"
            error={errors?.cep}
            name="cep"
            control={control}
            mask={Masks.ZIP_CODE}
            rules={{
              required: "Este campo é obrigatório!",
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
            control={control}
            mask={Masks.BRL_PHONE}
            rules={{ required: "Este campo é obrigatório!" }}
          />
          <CustomInput
            label="E-mail"
            error={errors?.email}
            name="email"
            control={control}
            rules={{ required: "Este campo é obrigatório!" }}
          />
          <CustomInput
            label="Doc. Identificação / Órgão Emissor / UF"
            error={errors?.rg}
            name="rg"
            control={control}
            rules={{ required: "Este campo é obrigatório!" }}
          />
        </VStack>
      </Center>
    </Box>
  );
};

export default Identification;
