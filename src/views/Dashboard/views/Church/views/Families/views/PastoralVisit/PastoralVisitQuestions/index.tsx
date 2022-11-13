import {
  Box,
  Center,
  Heading,
  SectionList,
  Text,
  useToast,
  View,
  VStack,
} from "native-base";
import { Header } from "../../../../../../../../../components/Header";

import { Control, useForm, useWatch } from "react-hook-form";
import {
  Familie,
  Person,
} from "../../../../../../../../../database/entities/FamilieChurchPersonSermon";
import { Fragment, useEffect } from "react";
import CustomInput from "../../../../../../../../../components/customInput";
import { CustomCheckBox } from "../components/customCheckBox";
import ButtonDefault from "../../../../../../../../../components/button";
import { useDatabaseConnection } from "../../../../../../../../../database/connection";
import usePastoralVisitService from "../../../../../../../../../database/services/pastoralVisitService";
import { useCustomToast } from "../../../../../../../../../hooks";

interface PastoralVisitQuestionsProps {
  route: any;
}

const PastoralVisitQuestions = ({ route }: PastoralVisitQuestionsProps) => {
  const { connection } = useDatabaseConnection();
  const pastoralVisit = usePastoralVisitService(connection);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const toast = useToast();

  const church = route?.params?.church;
  const familie = route?.params?.familie;
  const isEditable = route?.params?.isEditable;

  const sections: {
    title: string;
    obs?: string;
    subTitle?: string;
    data: {
      title: string;
      showTitle?: boolean;
      showInput?: boolean;
      showButton?: boolean;
    }[];
  }[] = [
    {
      title: "Comunhão",
      subTitle: "Você pratica diariamente?",
      obs: "Caso sim marque a caixinha ao lado no nome",
      data: [
        { title: "Cinco minutos exclusivos à oração?" },
        { title: "Lê ao menos um capítulo da Bíblia?" },
        { title: "Estuda a Lição com o cônjuge?" },
        { title: "Faz culto familiar com filhos?" },
        { title: "Devolve regularmente o Dízimo?" },
        { title: "Devolve regularmente as Ofertas?" },
      ],
    },
    {
      title: "Relacionamento",
      subTitle: "Vai em algum Pequeno Grupo?",
      obs: "Caso sim marque a caixinha ao lado no nome",

      data: [{ title: "Vai em algum Pequeno Grupo?", showTitle: false }],
    },
    {
      title: "Missão",
      obs: "Caso sim marque a caixinha ao lado no nome",

      data: [
        { title: "Tem dupla missionária?", showInput: true },
        { title: "Está dando estudos bíblicos?", showInput: true },
      ],
    },
    {
      title: "Outros",
      data: [
        { title: "O que gosta de fazer na igreja", showInput: true },
        { title: "Qual hobby", showInput: true },
        {
          title: "Quando você pensa em um bom pastor, o que vem a sua mente?",
          showInput: true,
          showButton: true,
        },
      ],
    },
  ];

  const onSubmit = async (data: any) => {
    if (!familie?.pastoralVisit && isEditable) {
      const newQuiz = JSON.stringify(data);

      await pastoralVisit.create({ quiz: newQuiz }, familie.id).then(() => {
        familie.pastoralVisit.quiz = newQuiz;

        const familieIndex = church.families?.findIndex(
          (currFamilie: Familie) => currFamilie.id === familie.id
        );

        church.families[familieIndex] = familie;

        useCustomToast({
          toast,
          msg: "Visita pastoral criada com sucesso !",
          type: "sucess",
        });
      });
    } else {
      await pastoralVisit
        .update(familie.pastoralVisit.id, {
          quiz: JSON.stringify(data),
        })
        .then(() => {
          const newQuiz = JSON.stringify(data);

          familie.pastoralVisit.quiz = newQuiz;

          const familieIndex = church.families?.findIndex(
            (currFamilie: Familie) => currFamilie.id === familie.id
          );

          church.families[familieIndex] = familie;

          useCustomToast({
            toast,
            msg: "Visita pastoral atualizada com sucesso !",
            type: "sucess",
          });
        });
    }
  };

  useEffect(() => {
    if (familie?.pastoralVisit && isEditable) {
      reset(JSON.parse(familie?.pastoralVisit.quiz));
    }
  }, []);

  return (
    <View w="100%" h="100%" bg="gray.200">
      <Header title="Visita Pastoral" path="Families" params={{ church }} />
      <SectionList
        w="100%"
        px={10}
        sections={sections}
        keyExtractor={(item, index) => `${item} ${index}`}
        ListFooterComponent={<Box mt={10} />}
        renderSectionHeader={({ section: { title, subTitle, obs } }) => (
          <Center mt={5}>
            <Heading fontSize="30" color="blue.300">
              {title}
            </Heading>

            {subTitle ? (
              <Text fontSize="14" fontWeight="bold" color="yellow.300">
                {subTitle}
              </Text>
            ) : null}

            {obs ? (
              <Text fontSize="11" mt={5} color="green.300">
                {obs}
              </Text>
            ) : null}
          </Center>
        )}
        renderItem={({
          item: { title, showTitle = true, showInput = false, showButton },
        }) => (
          <VStack mt={10} space={4}>
            <VStack space={2}>
              {showTitle ? (
                <Text fontSize="15" fontWeight="bold">
                  {title}
                </Text>
              ) : null}
              {familie?.persons?.map((person: Person) => (
                <Fragment key={`${person?.id} ${title}`}>
                  <Checkbox
                    control={control}
                    errors={errors}
                    person={person}
                    mission={title}
                    showInput={showInput}
                    isEditable={!isEditable}
                  />
                </Fragment>
              ))}
            </VStack>

            {showButton && !isEditable ? (
              <ButtonDefault
                buttonProps={{
                  width: "100%",
                  mt: 10,
                  onPress: handleSubmit(onSubmit),
                }}
              >
                <Text fontSize="20" fontWeight="semibold" color="white">
                  Finalizar visita
                </Text>
              </ButtonDefault>
            ) : null}
          </VStack>
        )}
      />
    </View>
  );
};

const Checkbox = ({
  control,
  person,
  errors,
  mission,
  showInput = false,
  isEditable = true,
}: {
  control: Control<any>;
  person: Person;
  errors: any;
  mission: string;
  showInput?: boolean;
  isEditable?: boolean;
}) => {
  const name = `${person?.id} ${mission}`;

  const yes = useWatch({
    control,
    name,
  });

  return (
    <VStack space={5}>
      <CustomCheckBox
        text={person?.name}
        control={control}
        name={name}
        value={true}
        isEditable={isEditable}
      />
      {yes && showInput ? (
        <CustomInput
          inputProps={{
            fontSize: 12,
            height: 50,
          }}
          rules={{ required: "Este campo é obrigatório!" }}
          error={errors?.[`${name}other`]}
          control={control}
          name={`${name}other`}
          isEditable={isEditable}
        />
      ) : null}
    </VStack>
  );
};

export default PastoralVisitQuestions;
