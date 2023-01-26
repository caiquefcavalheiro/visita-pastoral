import {
  Center,
  Heading,
  ScrollView,
  Text,
  useToast,
  View,
  VStack,
} from "native-base";
import { Header } from "../../../../../../../../../components/Header";

import { Control, useForm, useWatch } from "react-hook-form";
import {
  Familie,
  FamilieModel,
  Person,
  PersonModel,
  PositionModel,
} from "../../../../../../../../../database/entities/FamilieChurchPersonSermon";
import { Fragment, useEffect, useState } from "react";
import CustomInput from "../../../../../../../../../components/customInput";
import { CustomCheckBox } from "../components/customCheckBox";
import ButtonDefault from "../../../../../../../../../components/button";
import { useDatabaseConnection } from "../../../../../../../../../database/connection";
import usePastoralVisitService from "../../../../../../../../../database/services/pastoralVisitService";
import { useCustomToast } from "../../../../../../../../../hooks";
import usePositionService from "../../../../../../../../../database/services/positionService";
import CardPerson from "../components/CardPerson";
import usePersonService from "../../../../../../../../../database/services/personService";
import { orderByDate } from "../../../../../../../../../utils";

interface PastoralVisitQuestionsProps {
  route: any;
  navigation: any;
}

const PastoralVisitQuestions = ({
  navigation,
  route,
}: PastoralVisitQuestionsProps) => {
  const { connection } = useDatabaseConnection();
  const pastoralVisit = usePastoralVisitService(connection);

  const Position = usePositionService(connection);
  const Person = usePersonService(connection);

  const [positions, setPositions] = useState<PositionModel[]>([]);

  const [familie, setFamilie] = useState(
    route?.params?.familie as FamilieModel
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const toast = useToast();

  const church = route?.params?.church;

  const sections: {
    data: {
      sectionTitle?: string;
      obs?: string;
      subTitle?: string;
      title?: string;
      showTitle?: boolean;
      showInput?: boolean;
      showButton?: boolean;
      showModalPosition?: boolean;
    }[];
  }[] = [
    {
      data: [
        {
          sectionTitle: "Comunhão",
          subTitle: "Você pratica diariamente?",
          obs: "Caso sim marque a caixinha ao lado no nome",
        },
        { title: "Você tem dedicado tempo à oração diariamente?" },
        { title: "Lê ao menos um capítulo da Bíblia?" },
        { title: "Estuda a Lição com o cônjuge?" },
        { title: "Faz culto familiar com filhos?" },
        { title: "Devolve regularmente o Dízimo?" },
        { title: "Devolve regularmente as Ofertas?" },
        { title: "Tem cuidados com a saúde?" },
      ],
    },
    {
      data: [
        {
          sectionTitle: "Relacionamento",
          subTitle: "Vai em algum Pequeno Grupo?",
        },
        { title: "Vai em algum Pequeno Grupo?", showTitle: false },
      ],
    },
    {
      data: [
        {
          sectionTitle: "Missão",
        },
        { title: "Tem dupla missionária?", showInput: true },
        { title: "Está dando estudos bíblicos?", showInput: true },
      ],
    },
    {
      data: [
        {
          sectionTitle: "Discipulado",
        },
        { title: "O que gosta de fazer na igreja", showModalPosition: true },
        { title: "Qual hobby", showInput: true },
        {
          title: "Quando você pensa em um bom pastor, o que vem a sua mente?",
          showInput: true,
        },
        {
          title:
            "Tem algum pedido ou agradecimento de oração ou alguma dúvida da Bíblia ou procedimentos da Igreja?",
          showInput: true,
          showButton: true,
        },
      ],
    },
  ];

  const onSubmit = async (data: any) => {
    const newQuiz = JSON.stringify(data);
    if (!familie?.pastoralVisit) {
      await pastoralVisit.create({ quiz: newQuiz }, familie.id).then((resp) => {
        familie.pastoralVisit = resp;
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
        setFamilie(familie);
      });
    } else {
      await pastoralVisit
        .update(familie.pastoralVisit.id, {
          quiz: JSON.stringify(data),
        })
        .then(() => {
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

          setFamilie(familie);
        })
        .catch((err) => {
          useCustomToast({
            toast,
            msg: JSON.stringify(err),
            type: "sucess",
            duration: 5000,
          });
        });
    }

    navigation.navigate("Church");
  };

  useEffect(() => {
    if (familie?.pastoralVisit) {
      reset(JSON.parse(familie?.pastoralVisit.quiz));
    }
  }, []);

  useEffect(() => {
    (async () => {
      let persons: PersonModel[] = [];
      for (let person of familie?.persons || []) {
        const personDb = await Person.getOne(person.id);
        if (personDb) {
          persons = [...persons, personDb];
        }
      }

      familie.persons = persons;
      setFamilie(familie);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await Position.getAllPositionsOfChurch(church.id);
      setPositions(response);
    })();
  }, []);

  const sortedPersons = familie.persons.sort((a: PersonModel, b: PersonModel) =>
    orderByDate(a?.createdAt ?? "", b.createdAt ?? "")
  );

  return (
    <View w="100%" h="100%" bg="gray.200">
      <Header title="Visita Pastoral" path="Families" params={{ church }} />

      <ScrollView px={10}>
        {sections.map(({ data }, index) => (
          <Fragment key={index}>
            {data.map(
              (
                {
                  title,
                  showTitle = true,
                  showInput = false,
                  showButton,
                  showModalPosition,
                  sectionTitle,
                  obs,
                  subTitle,
                },
                itemIndex
              ) => (
                <Fragment key={itemIndex}>
                  {sectionTitle ? (
                    <Center mt={5}>
                      {sectionTitle ? (
                        <Heading fontSize="30" color="blue.300">
                          {sectionTitle}
                        </Heading>
                      ) : null}

                      {subTitle ? (
                        <Text
                          fontSize="14"
                          fontWeight="bold"
                          color="yellow.300"
                        >
                          {subTitle}
                        </Text>
                      ) : null}

                      {obs ? (
                        <Text fontSize="11" mt={5} color="green.300">
                          {obs}
                        </Text>
                      ) : null}
                    </Center>
                  ) : null}

                  <VStack mb={5} space={2}>
                    <VStack space={3}>
                      {showTitle ? (
                        <Text fontSize="15" fontWeight="bold">
                          {title}
                        </Text>
                      ) : null}
                      {sortedPersons?.map((person: PersonModel) => (
                        <Fragment key={`${person?.id} ${title}`}>
                          {showModalPosition ? (
                            <CardPerson person={person} positions={positions} />
                          ) : (
                            <>
                              {title ? (
                                <Checkbox
                                  control={control}
                                  errors={errors}
                                  person={person}
                                  mission={title}
                                  showInput={showInput}
                                />
                              ) : null}
                            </>
                          )}
                        </Fragment>
                      ))}
                    </VStack>

                    {showButton ? (
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
                </Fragment>
              )
            )}
          </Fragment>
        ))}
      </ScrollView>
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
