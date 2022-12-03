import { useNavigation } from "@react-navigation/native";
import { AlertDialog, Button, Center, Text, VStack } from "native-base";
import { useRef, useState } from "react";
import ButtonDefault from "../../../../../../../../components/button";
import { CustomDialog } from "../../../../../../../../components/CustomDialog";
import {
  ChurchModel,
  FamilieModel,
} from "../../../../../../../../database/entities/FamilieChurchPersonSermon";
import { ModalCreateFamilie } from "../../../../../../components/ModalCreateFamilie";

type ModalFamiliesProps = {
  familie?: FamilieModel;
  onDeleteFamilie?: () => void;
  getAllFamilies: () => void;
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
  church: ChurchModel;
};

export function ModalFamilies({
  familie,
  onDeleteFamilie,
  getAllFamilies,
  isOpen,
  setIsOpen,
  church,
}: ModalFamiliesProps) {
  const [isOpenFamilie, setIsOpenFamilie] = useState(false);
  const [isOpenDeleteMsg, setIsDeleteMsg] = useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = useRef(null);

  const navigation = useNavigation();
  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content px={2}>
          <AlertDialog.Body mt="3" borderBottomWidth={0}>
            <VStack space={4}>
              <ButtonDefault
                buttonProps={{
                  width: "100%",
                  height: 16,
                  onPress: () => {
                    onClose();
                    navigation.navigate(
                      "PastoralVisitQuestions" as never,
                      { church, familie, isEditable: false } as never
                    );
                  },
                }}
              >
                <Text fontSize="17" fontWeight="bold" color="white">
                  Iniciar visita pastoral
                </Text>
              </ButtonDefault>

              <ButtonDefault
                buttonProps={{
                  width: "100%",
                  height: 16,
                  onPress: () => {
                    setIsOpenFamilie(true);
                    setIsOpen(false);
                  },
                }}
              >
                <Text fontSize="17" fontWeight="bold" color="white">
                  Editar família
                </Text>
              </ButtonDefault>
            </VStack>
          </AlertDialog.Body>
          <AlertDialog.Footer justifyContent="center" borderTopWidth={0} px={2}>
            <Button.Group justifyContent="space-between" mb={4} px={2} w="100%">
              <Button
                w="46%"
                h="12"
                bg="blue.400"
                onPress={onClose}
                ref={cancelRef}
                borderRadius={10}
              >
                <Text fontSize="17" fontWeight="bold" color="white">
                  Voltar
                </Text>
              </Button>
              <Button
                bg="red.400"
                onPress={() => {
                  setIsDeleteMsg(true);
                }}
                w="46%"
                borderRadius={10}
                h="12"
              >
                <Text fontSize="17" fontWeight="bold" color="white">
                  Deletar
                </Text>
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>

      <CustomDialog
        setIsOpen={setIsDeleteMsg}
        showTrigger={false}
        content={<Text>Tem certeza que deseja deletar esta familia ?</Text>}
        cancelMsg="Não"
        sucessMsg="Sim"
        onSuccess={() => {
          onDeleteFamilie?.();
          setIsOpen(false);
          setIsDeleteMsg(false);
        }}
        isOpen={isOpenDeleteMsg}
        onCancel={() => {
          setIsDeleteMsg(false);
        }}
      />

      <ModalCreateFamilie
        onClose={() => {
          setIsOpenFamilie(false);
        }}
        open={isOpenFamilie}
        {...(familie && {
          defaultValues: familie,
        })}
        {...(familie && {
          currentFamilie: familie,
        })}
        handleSave={getAllFamilies}
      />
    </Center>
  );
}
