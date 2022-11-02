import { Box, Center, Heading, VStack } from "native-base";
import { Fragment, memo } from "react";
import { CustomRadio } from "../customRadio";
import { useFormContext } from "react-hook-form";
import CustomInput from "../../../../components/customInput";

const fields = [
  { question: "Aceita a Bíblia toda como a inspirada Palavra de Deus?" },
  {
    question:
      "Aceita o ensino bíblico da trindade de que Deus é uma unidade de três pessoas coeternas: Pai, Filho e Espírito Santo?",
  },
  {
    question:
      "Aceita a morte de Jesus Cristo como o sacrifício que perdoa e apaga os pecados, e acredita que é salvo pela graça, mediante a fé?",
  },
  {
    question:
      "Aceita Jesus Cristo como o seu único Salvador pessoal e o Senhor da sua vida?",
  },
  {
    question:
      "Decide deixar tudo o que prejudica a sua saúde e a de outras pessoas, evitando o consumo de alimentos impróprios, o uso, a fabricação e a comercialização de bebidas alcoólicas, tabaco, café, drogas ilícitas, porque reconhece que o corpo é o templo do Espírito Santo?",
  },
  {
    question:
      "Aceita pôr em prática todas as crenças e princípios bíblicos fundamentais, incluindo a modéstia cristã no vestir-se, no uso de adornos e na aparência pessoal, abstendo-se de frequentar lugares impróprios, assim como ensina a Igreja Adventista do Sétimo Dia?",
  },
  {
    question:
      "Aceita devolver fiel e voluntariamente o dízimo e a oferta, de acordo com o ensinamento bíblico?",
  },
  {
    question:
      "Decide obedecer a todos os mandamentos de Deus, inclusive o do sábado?",
  },
  {
    question:
      "Crê e aceita que a Igreja Adventista do Sétimo Dia é a igreja remanescente dos últimos dias de acordo com a profecia bíblica, e deseja ser aceito como membro da congregação local da Igreja Adventista mundial?",
  },
  {
    question:
      "Aceita o ensinamento bíblico dos dons espirituais e crê que o dom de profecia manifesto no ministério de Ellen G. White é uma característica distintiva da igreja remanescente?",
  },
  {
    question:
      "Aceita o ensinamento bíblico do batismo por imersão e voluntariamente decide ser batizado?",
  },
  {
    question:
      "Aceita que Jesus Cristo é o seu intercessor no Santuário Celestial e que Ele lhe oferece Sua graça e Seu poder para viver uma vida centrada Nele?",
  },
  {
    question:
      "Aceita preparar-se como discípulo e se dispõe a discipular pessoas para a breve vinda do nossoSenhor Jesus Cristo, participando ativamente da pregação do evangelho?",
  },
];

function DeclarationOfFaith() {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <Box>
      <Center w="100%">
        <Heading fontSize="30" color="blue.300">
          Declaração De Fé
        </Heading>

        <VStack space="10" mt="10" w="100%">
          {fields.map(({ question }, index) => (
            <Fragment key={question}>
              <CustomRadio
                options={[
                  { value: "Sim", label: "Sim" },
                  { value: "Não", label: "Não" },
                ]}
                radioGroupProps={{
                  name: "test",
                  w: "100%",
                }}
                label={`${index + 1}. ${question}`}
                error={errors?.[`declaration${index}`]}
                control={control}
                name={`declaration${index}`}
              />
            </Fragment>
          ))}

          <CustomInput
            label="Quem discipularei"
            error={errors?.whoWillIDisciple}
            name="whoWillIDisciple"
            control={control}
          />
        </VStack>
      </Center>
    </Box>
  );
}

export default memo(DeclarationOfFaith);
