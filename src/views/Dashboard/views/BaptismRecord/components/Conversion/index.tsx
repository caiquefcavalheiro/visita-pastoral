import { Box, Center, Heading, Text, View, VStack } from "native-base";
import { memo } from "react";
import CustomInput from "../../../../../../components/customInput";
import { CustomRadio } from "../customRadio";

import { useFormContext } from "react-hook-form";
function Conversion() {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <View w="100%">
      <Center>
        <Heading fontSize="30" color="blue.300">
          Conversão
        </Heading>
      </Center>

      <VStack space="10" mt="10" w="100%">
        <Text fontSize="18" color="yellow.600">
          Preencher o nome completo de até dois instrutores bíblicos
        </Text>
        <CustomInput
          label="1° Instrutor/a bíblico/a"
          error={errors?.firstBibleInstructor}
          control={control}
          name="firstBibleInstructor"
        />
        <CustomInput
          label="2° Instrutor/a bíblico/a"
          error={errors?.secondBibleInstructor}
          control={control}
          name="secondBibleInstructor"
        />

        <Box>
          <CustomRadio
            options={[
              { value: "Acampamento/retiro", label: "Acampamento/retiro" },
              { value: "ADRA", label: "ADRA" },
              { value: "Amigos/conhecidos", label: "Amigos/conhecidos" },
              { value: "Desbravadores/Avent", label: "Desbravadores/Avent" },
              { value: "Educação Adventista", label: "Educação Adventista" },
              { value: "Escola Sabatina", label: "Escola Sabatina" },
              { value: "Evangelismo público", label: "Evangelismo público" },
              { value: "Família/parentes", label: "Família/parentes" },
              {
                value: "Instituição de saúde",
                label: "Instituição de saúde",
              },
              { value: "Internet", label: "Internet" },
              { value: "Livros/literatura", label: "Livros/literatura" },
              { value: "Missão Calebe", label: "Missão Calebe" },
              { value: "Mutirão de Natal", label: "Mutirão de Natal" },
              { value: "Pequeno Grupo", label: "Pequeno Grupo" },
              {
                value: "Quebrando o Silêncio",
                label: "Quebrando o Silêncio",
              },
              { value: "Rádio", label: "Rádio" },
              { value: "TV", label: "TV" },
              { value: "Outro", label: "Outro" },
            ]}
            radioGroupProps={{
              name: "test",
              w: "100%",
            }}
            label="Como você conheceu a IASD?"
            error={errors?.howDidSDA}
            control={control}
            name="howDidSDA"
            renderCase="Outro"
            renderCaseElement={
              <CustomInput
                error={errors?.otherHowDidSDA}
                control={control}
                name="otherHowDidSDA"
                placeholder="Como você conheceu a IASD ?"
                mt="6"
                maxLength={50}
              />
            }
          />
        </Box>

        <Box>
          <CustomRadio
            options={[
              { value: "Classe Bíblica ASA", label: "Classe Bíblica ASA" },
              {
                value: "Classe Bíblica Calebe/Jovens",
                label: "Classe Bíblica Calebe/Jovens",
              },
              {
                value: "Classe Bíblica da igreja",
                label: "Classe Bíblica da igreja",
              },
              {
                value: "Classe Bíblica Desbr/Avent",
                label: "Classe Bíblica Desbr/Avent",
              },
              {
                value: "Classe Bíblica Educação",
                label: "Classe Bíblica Educação",
              },
              { value: "Classe Bíblica ES", label: "Classe Bíblica ES" },
              {
                value: "Escola Bíblica Novo Tempo",
                label: "Escola Bíblica Novo Tempo",
              },
              {
                value: "Escola Cristã de Férias",
                label: "Escola Cristã de Férias",
              },
              {
                value: "Estudo Bíblico individual",
                label: "Estudo Bíblico individual",
              },
              {
                value: "Estudo Bíblico on-line",
                label: "Estudo Bíblico on-line",
              },
              { value: "Evangelismo público", label: "Evangelismo público" },
              {
                value: "Ouvi sermões na igreja",
                label: "Ouvi sermões na igreja",
              },
              { value: "Pequeno Grupo", label: "Pequeno Grupo" },
              {
                value: "Estudei pouco a Bíblia",
                label: "Estudei pouco a Bíblia",
              },
              {
                value: "Não estudei a Bíblia",
                label: "Não estudei a Bíblia",
              },
              { value: "Outro", label: "Outro" },
            ]}
            radioGroupProps={{
              name: "test",
              w: "100%",
            }}
            label="Como você estudou a Bíblia?"
            error={errors?.howYouStudyBible}
            control={control}
            name="howYouStudyBible"
            renderCase="Outro"
            renderCaseElement={
              <CustomInput
                error={errors?.otherHowYouStudyBible}
                control={control}
                name="otherHowYouStudyBible"
                placeholder="Como você estudou a Bíblia?"
                mt="6"
                maxLength={50}
              />
            }
          />
        </Box>

        <Box>
          <CustomRadio
            options={[
              { value: "Amigos", label: "Amigos" },
              { value: "Convicção pessoal", label: "Convicção pessoal" },
              { value: "Desbravadores/Avent", label: "Desbravadores/Avent" },
              { value: "Educação Adventista", label: "Educação Adventista" },
              { value: "Escola Sabatina", label: "Escola Sabatina" },
              { value: "Evangelismo público", label: "Evangelismo público" },
              { value: "Família/parentes", label: "Família/parentes" },
              { value: "Internet", label: "Internet" },
              { value: "Missão Calebe", label: "Missão Calebe" },
              { value: "Pequeno Grupo", label: "Pequeno Grupo" },
              { value: "Programa Reencontro", label: "Programa Reencontro" },
              { value: "Rádio", label: "Rádio" },
              { value: "Semana de Oração", label: "Semana de Oração" },
              { value: "TV", label: "TV" },
              { value: "Outro", label: "Outro" },
            ]}
            radioGroupProps={{
              name: "test",
              w: "100%",
            }}
            label="Qual foi o fator decisivo para você ser batizado/a?"
            error={errors?.decidingBaptized}
            control={control}
            name="decidingBaptized"
            renderCase="Outro"
            renderCaseElement={
              <CustomInput
                error={errors?.otherDecidingBaptized}
                control={control}
                name="otherDecidingBaptized"
                placeholder="Qual foi o fator decisivo para você ser batizado/a?"
                mt="6"
                maxLength={50}
              />
            }
          />
        </Box>
      </VStack>
    </View>
  );
}

export default memo(Conversion);
