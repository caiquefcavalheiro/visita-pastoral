import { Spinner, useToast, VStack } from "native-base";
import { useState } from "react";
import { Fragment, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import ButtonDefault from "../../../../../../../../../../components/button";
import CustomInput from "../../../../../../../../../../components/customInput";
import { CustomModal } from "../../../../../../../../../../components/customModal";
import { useDatabaseConnection } from "../../../../../../../../../../database/connection";
import {
  Person,
  PositionModel,
} from "../../../../../../../../../../database/entities/FamilieChurchPersonSermon";
import usePersonService from "../../../../../../../../../../database/services/personService";
import { useCustomToast } from "../../../../../../../../../../hooks";
import { CustomCheckBox } from "../../../../../../components/customCheckBox";

interface Props {
  open: boolean;
  onClose: () => void;
  handleAdd: () => void;
  person?: Person | null;
  positions: PositionModel[];
}

type PositionM = Omit<PositionModel, "church" | "persons">;

type FormDataType = {
  Ancionato?: PositionM;
  Aventureiros?: PositionM;
  "Ação Solidária"?: PositionM;
  Comunicação?: PositionM;
  Construção?: PositionM;
  "Coordenador de PG"?: PositionM;
  Desbravadores?: PositionM;
  Diaconato?: PositionM;
  Educação?: PositionM;
  "Escola Sabatina"?: PositionM;
  Família: PositionM;
  "Ministério Jovem"?: PositionM;
  "Ministério Pessoal (Evangelismo)": PositionM;
  "Ministério da Criança"?: PositionM;
  "Ministério da Mulher"?: PositionM;
  "Ministério do Idoso"?: PositionM;
  Mordomia?: PositionM;
  Música?: PositionM;
  Publicações?: PositionM;
  Saúde?: PositionM;
  Secretaria?: PositionM;
  Sonoplastia?: PositionM;
  Tesouraria?: PositionM;
  hasOtherPosition?: string;
  otherPosition?: string;
};

export const ModalEditPosition = ({
  open,
  onClose,
  handleAdd,
  person,
  positions,
}: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataType>();

  const [isLoading, setIsloading] = useState(true);

  const toast = useToast();

  const { connection } = useDatabaseConnection();
  const Person = usePersonService(connection);

  const onSubmit = async (data: FormDataType) => {
    const selectedPositions = Object.values(data).filter(
      (ele) =>
        !!ele && ele !== data?.otherPosition && ele !== data?.hasOtherPosition
    ) as PositionM[];

    if (person?.id) {
      if (!data?.hasOtherPosition) {
        await Person.update(person.id, {
          otherPosition: undefined,
        });
      } else {
        await Person.update(person.id, {
          otherPosition: data?.otherPosition,
        });
      }
      await Person.applyForPosition(person.id, selectedPositions).then(
        async () => {
          useCustomToast({
            msg: "Cargos atualizados com sucesso!",
            toast,
            type: "sucess",
          });

          person.positions = selectedPositions as PositionModel[];

          handleAdd();
          onClose();
        }
      );
    }
  };

  const resetForm = () => {
    if (person?.positions) {
      const defaultV = person?.positions?.reduce(
        (acc, currentValue) =>
          (acc = { ...acc, [currentValue.position]: currentValue }),
        {}
      ) as FormDataType;
      if (person?.otherPosition) {
        defaultV.otherPosition = person?.otherPosition;
        defaultV.hasOtherPosition = "Outros";
      }
      reset(defaultV);
    }
    setIsloading(false);
  };

  useEffect(() => {
    resetForm();
  }, [person]);

  const otherPosition = useWatch({ control, name: "hasOtherPosition" });

  return (
    <CustomModal
      open={open}
      onClose={() => {
        onClose();
        reset({});
      }}
      placement="center"
      header="Cargos"
      headerProps={{
        borderBottomWidth: 0,
      }}
      textProps={{
        fontWeight: "bold",
        fontSize: "16",
      }}
      Content={
        <>
          {isLoading ? (
            <Spinner size={60} />
          ) : (
            <VStack space={4}>
              <ButtonDefault
                buttonProps={{
                  onPress: handleSubmit(onSubmit),
                  width: "100%",
                  mb: 4,
                }}
              >
                Candidatar
              </ButtonDefault>
              {positions.map((item) => (
                <Fragment key={item.id}>
                  <CustomCheckBox
                    text={item.position}
                    control={control}
                    name={item.position}
                    value={item}
                  />
                </Fragment>
              ))}

              <CustomCheckBox
                text={"Outros"}
                control={control}
                name={"hasOtherPosition"}
                value="Outros"
              />

              {otherPosition && (
                <CustomInput
                  inputProps={{ placeholder: "Outros cargos" }}
                  rules={{ required: "Este campo é obrigatório !" }}
                  error={errors?.otherPosition}
                  name="otherPosition"
                  control={control}
                />
              )}
            </VStack>
          )}
        </>
      }
    />
  );
};
