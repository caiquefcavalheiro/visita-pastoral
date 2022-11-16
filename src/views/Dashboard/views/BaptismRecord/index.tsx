import {
  Box,
  Center,
  Heading,
  IRadioGroupProps,
  IRadioProps,
  SectionList,
  Text,
  useToast,
  View,
  VStack,
} from "native-base";
import ButtonDefault from "../../../../components/button";
import { Header } from "../../../../components/Header";

import { useCustomToast } from "../../../../hooks";
import { Fragment, memo } from "react";
import {
  UseControllerProps,
  useForm,
  Control,
  useWatch,
} from "react-hook-form";
import { defaultValues } from "./defaultValue";
import { CustomRadio } from "./components/customRadio";
import { CustomCheckBox } from "../../../../components/customCheckBox";
import CustomInput from "../../../../components/customInput";
import { Mask, Masks } from "react-native-mask-input";
import { InputTypes } from "./inputTypes";

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
  whoWillIDisciple: string;
  motherIdentificationDoc: string;
  fatherIdentificationDoc: string;
};

type QuestionType = {
  title: string;
  obs?: string;
  subTitle?: string;
  data: {
    showButton?: boolean;
    radio?: {
      label: string;
      name:
        | "action"
        | "theChurchWasConsulted"
        | "sex"
        | "maritalStatus"
        | "howDidSDA"
        | "howYouStudyBible"
        | "decidingBaptized";
      options: {
        value: any;
        label: string;
        style?: IRadioProps;
      }[];
      radioGroupProps: IRadioGroupProps;
      renderCase?: string;
      input?: any;
    };

    checkBox?: {
      label: string;
      name: "specialVote";
      text: string;
    };

    input?: {
      label: string;
      name: InputTypes;
      mask?: Mask;
      keyboardType?: string;
      rules?: UseControllerProps["rules"];
    };
    declarationOfFaith?: {
      question: string;
    }[];
  }[];
};

function BaptismRecord({ navigation }: any) {
  const toast = useToast();

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    defaultValues,
  });

  function handleSubmitData(data: any) {
    useCustomToast({
      toast,
      msg: "Dados cadastrados com sucesso!",
      type: "sucess",
    });
    navigation.navigate("Signatures", { baptismRecordData: data });
  }

  const questions: QuestionType[] = [
    {
      title: "Informações sobre a ficha",
      data: [
        {
          radio: {
            label: "Ação",
            name: "action",
            options: [
              { value: "Batismo", label: "Batismo" },
              { value: "Rebatismo*", label: "Rebatismo*" },
              { value: "Profissão de fé*", label: "Profissão de fé*" },
            ],
            radioGroupProps: {
              name: "test",
              w: "100%",
            },
          },
        },
        {
          checkBox: {
            label:
              "Anexar a ficha de “Pedido de Batismo por Voto Especial” aprovado pela Comissão Diretiva do Campo local",
            name: "specialVote",
            text: "Voto especial",
          },
        },
        {
          input: {
            label: "Motivo",
            name: "reason",
          },
        },
        {
          radio: {
            label:
              "Foi consultada a igreja/grupo ou o pastor onde o/a candidato/a foi removido/a?",
            name: "theChurchWasConsulted",
            options: [
              { value: "Sim", label: "Sim" },
              { value: "Não", label: "Não" },
            ],
            radioGroupProps: {
              name: "test",
              w: "100%",
            },
          },
        },
        {
          input: {
            label: "Data da remoção",
            name: "removalDate",
            mask: Masks.DATE_DDMMYYYY,
            keyboardType: "numeric",
            rules: {
              required: false,
              pattern: {
                value: /^\d{2}\/\d{2}\/\d{4}$/,
                message: "Digite uma data valida !",
              },
            },
          },
        },
        {
          input: {
            label: "Igreja/grupo e localidade onde foi membro",
            name: "churchWhereHeWasAmember",
          },
        },
      ],
    },
    {
      title: "Identificação",
      data: [
        {
          input: {
            label: "Nome (sem abreviações)",
            name: "name",
          },
        },
        {
          input: {
            label: "Sobrenome (sem abreviações)",
            name: "lastName",
          },
        },
        {
          input: {
            label: "Data de nascimento",
            name: "birthDate",
            mask: Masks.DATE_DDMMYYYY,
            keyboardType: "numeric",
            rules: {
              required: false,
              pattern: {
                value: /^\d{2}\/\d{2}\/\d{4}$/,
                message: "Digite uma data valida !",
              },
            },
          },
        },
        {
          radio: {
            label: "Sexo do candidato",
            name: "sex",
            options: [
              { value: "Masculino", label: "Masculino" },
              { value: "Feminino", label: "Feminino" },
            ],
            radioGroupProps: {
              name: "test",
              w: "100%",
            },
          },
        },
        {
          radio: {
            label: "Estado civil",
            name: "maritalStatus",
            options: [
              { value: "Solteiro", label: "Solteiro" },
              { value: "Divorciado", label: "Divorciado" },
              { value: "Viúvo", label: "Viúvo" },
              { value: "Casado", label: "Casado" },
            ],
            radioGroupProps: {
              name: "test",
              w: "100%",
            },
          },
        },
        {
          input: {
            label: "Data casamento civil",
            name: "civilMarriageDate",
            mask: Masks.DATE_DDMMYYYY,
            keyboardType: "numeric",
            rules: {
              required: false,
              pattern: {
                value: /^\d{2}\/\d{2}\/\d{4}$/,
                message: "Digite uma data valida !",
              },
            },
          },
        },
        {
          input: {
            label: "Religião anterior",
            name: "previousReligion",
          },
        },
        {
          input: {
            label: "Cidade, UF, país de nascimento",
            name: "countryOfBirth",
          },
        },
        {
          input: {
            label: "Nome da mãe",
            name: "motherName",
          },
        },
        {
          input: {
            label: "Doc. Identificação / Órgão Emissor / UF (Mãe)",
            name: "motherIdentificationDoc",
          },
        },
        {
          input: {
            label: "Nome do pai",
            name: "fatherName",
          },
        },
        {
          input: {
            label: "Doc. Identificação / Órgão Emissor / UF (Pai)",
            name: "fatherIdentificationDoc",
          },
        },
        {
          input: {
            label: "Endereço residencial completo",
            name: "fullResidentialAddress",
          },
        },
        {
          input: {
            label: "Bairro",
            name: "neighborhood",
          },
        },
        {
          input: {
            label: "Cidade, UF, país da residência",
            name: "countryOfResidence",
          },
        },
        {
          input: {
            label: "CEP",
            name: "cep",
            keyboardType: "numeric",
            mask: Masks.ZIP_CODE,
            rules: {
              required: false,
              minLength: {
                value: 9,
                message: "O CEP deve ter no mínimo 8 dígito",
              },
            },
          },
        },
        {
          input: {
            label: "Telefone",
            name: "phone",
            keyboardType: "numeric",
            mask: Masks.BRL_PHONE,
          },
        },
        {
          input: {
            label: "E-mail",
            name: "email",
            keyboardType: "numeric",
            rules: {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Digite um email valido !",
              },
            },
          },
        },
        {
          input: {
            label: "Doc. Identificação / Órgão Emissor / UF",
            name: "rg",
          },
        },
      ],
    },
    {
      title: "Conversão",
      obs: "Preencher o nome completo de até dois instrutores bíblicos",
      data: [
        {
          input: {
            label: "1° Instrutor/a bíblico/a",
            name: "firstBibleInstructor",
          },
        },
        {
          input: {
            label: "2° Instrutor/a bíblico/a",
            name: "secondBibleInstructor",
          },
        },
        {
          radio: {
            label: "Como você conheceu a IASD?",
            name: "howDidSDA",
            options: [
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
            ],
            radioGroupProps: {
              name: "test",
              w: "100%",
            },
            input: {
              name: "otherHowDidSDA",
              placeholder: "Como você conheceu a IASD ?",
              mt: "6",
            },
            renderCase: "Outro",
          },
        },
        {
          radio: {
            label: "Como você estudou a Bíblia?",
            name: "howYouStudyBible",
            options: [
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
            ],
            radioGroupProps: {
              name: "test",
              w: "100%",
            },
            input: {
              name: "otherHowYouStudyBible",
              placeholder: "Como você estudou a Bíblia?",
              mt: "6",
            },
            renderCase: "Outro",
          },
        },
        {
          radio: {
            label: "Qual foi o fator decisivo para você ser batizado/a?",
            name: "decidingBaptized",
            options: [
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
            ],
            radioGroupProps: {
              name: "test",
              w: "100%",
            },
            input: {
              name: "otherDecidingBaptized",
              placeholder:
                "Qual foi o fator decisivo para você ser batizado/a?",
              mt: "6",
            },
            renderCase: "Outro",
          },
        },
      ],
    },
    {
      title: "Declaração De Fé",
      data: [
        {
          declarationOfFaith: [
            {
              question:
                "Aceita a Bíblia toda como a inspirada Palavra de Deus?",
            },
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
          ],
        },
        {
          input: {
            label: "Quem discipularei",
            name: "whoWillIDisciple",
          },
        },
      ],
    },
    {
      title: "Cerimônia",
      data: [
        {
          input: {
            label: "Local, cidade/UF da cerimônia",
            name: "ceremonyLocation",
          },
        },
        {
          input: {
            label: "Nome completo do pastor oficiante",
            name: "fullNameOfficiatingPastor",
          },
        },
        {
          input: {
            label: "Nome da igreja/grupo que o/a recebeu como membro",
            name: "nameTheChurch",
          },
        },
        {
          input: {
            label: "Cidade/UF da igreja/grupo organizado",
            name: "cityChurchOrganizedGroup",
          },
        },
        {
          input: {
            label: "Data e voto da Reunião Regular/Administrativa",
            name: "dateAndCoteTheAdministrativeMeeting",
            mask: Masks.DATE_DDMMYYYY,
            keyboardType: "numeric",
            rules: {
              required: false,
              pattern: {
                value: /^\d{2}\/\d{2}\/\d{4}$/,
                message: "Digite uma data valida !",
              },
            },
          },
        },
        {
          input: {
            label: "Nome secretário/a da igreja/grupo organizado",
            name: "nameSecretaryOrganizedGroup",
          },
        },
        { showButton: true },
      ],
    },
  ];

  return (
    <View w="100%" h="100%" bg="gray.200">
      <Header title="Ficha de Batismo" path="Dashboard" />
      <SectionList
        w="100%"
        sections={questions}
        keyExtractor={(item, index) => `${item} ${index}`}
        ListFooterComponent={<Box mt={10} />}
        renderSectionHeader={({ section: { title, subTitle, obs } }) => (
          <Center mt={5}>
            <Heading fontSize="30" color="blue.300" mt={10}>
              {title}
            </Heading>

            {subTitle ? (
              <Text fontSize="14" fontWeight="bold" color="yellow.300">
                {subTitle}
              </Text>
            ) : null}

            {obs ? (
              <Text fontSize="18" mt={6} color="yellow.600">
                {obs}
              </Text>
            ) : null}
          </Center>
        )}
        renderItem={({
          item: { showButton, radio, checkBox, input, declarationOfFaith },
        }) => (
          <VStack space="15" mt="10" w="100%" px={10}>
            {radio ? (
              <>
                <CustomRadio
                  error={errors?.[radio.name]}
                  control={control}
                  {...radio}
                />
                {radio.renderCase ? (
                  <RenderCaseInput
                    control={control}
                    errors={errors}
                    input={radio.input}
                    renderName={radio.name}
                    renderValue={radio.renderCase}
                  />
                ) : null}
              </>
            ) : null}

            {checkBox ? (
              <CustomCheckBox
                label={checkBox.label}
                text={checkBox.text}
                control={control}
                name={checkBox.name}
              />
            ) : null}

            {input ? (
              <CustomInput
                error={errors?.[input.name]}
                control={control}
                {...input}
              />
            ) : null}

            {declarationOfFaith
              ? declarationOfFaith.map(({ question }, index) => (
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
                      control={control}
                      name={`declaration${index}`}
                    />
                  </Fragment>
                ))
              : null}

            {showButton ? (
              <ButtonDefault
                buttonProps={{
                  width: "100%",
                  mt: 10,
                  onPress: handleSubmit(handleSubmitData),
                }}
              >
                <Text fontSize="20" fontWeight="semibold" color="white">
                  Ir para as assinaturas
                </Text>
              </ButtonDefault>
            ) : null}
          </VStack>
        )}
      />
    </View>
  );
}

export default memo(BaptismRecord);

const RenderCaseInput = ({
  control,
  input,
  errors,
  renderName,
  renderValue,
}: {
  control: Control<any>;
  input: any;
  errors: any;
  renderName: string;
  renderValue: any;
}) => {
  const render = useWatch({
    control,
    name: renderName,
  });

  if (render !== renderValue) {
    return null;
  }

  return (
    <CustomInput error={errors?.[input.name]} control={control} {...input} />
  );
};
