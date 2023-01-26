import { Divider, ScrollView, Text, useToast, View, VStack } from "native-base";
import { memo, useState } from "react";
import ButtonDefault from "../../../../../../components/button";
import { Header } from "../../../../../../components/Header";
import Signature from "./components/Signature/Signature";
import { useFieldArray, useForm } from "react-hook-form";
import { useCustomToast } from "../../../../../../hooks";
import { BaptismRecordData } from "../..";
import { CustomDialog } from "../../../../../../components/CustomDialog";
import { Linking } from "react-native";
import { generateTemplatePdf } from "./generateTemplatePdf";

function Signatures({ route }: any) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);

  const { baptismRecordData } = route.params as {
    baptismRecordData: BaptismRecordData;
  };

  const [show, setShow] = useState(false);

  const toast = useToast();

  const { control } = useForm<{
    signatures: Array<{ signature: string; currentUserName: string | null }>;
  }>();

  const { append, fields, update } = useFieldArray({
    control,
    name: "signatures",
  });

  async function handleAddSignatures(signature: string) {
    if (currentIndex !== null && fields?.[currentIndex]) {
      update(currentIndex, { signature, currentUserName });
    } else {
      append({ signature, currentUserName });
    }
    setShow(false);
  }

  async function handlePress(index: number, name: string) {
    setCurrentIndex(index);
    setCurrentUserName(name);
    setShow(true);
  }

  async function handleClose() {
    setShow(false);
  }

  async function handleSubmitData() {
    const pastorSignature = fields.find(
      (field) => field?.currentUserName === "pastor"
    );

    const secretaryOrResponsibleGroup = fields.find(
      (field) => field?.currentUserName === "secretária ou grupo responsável"
    );

    const candidateSignature = fields.find(
      (field) => field?.currentUserName === "candidato"
    );

    const fatherSignature = fields.find(
      (field) => field?.currentUserName === "assinatura do pai"
    );

    const motherSignature = fields.find(
      (field) => field?.currentUserName === "assinatura da mãe"
    );

    const data = {
      ...baptismRecordData,
      pastorSignature,
      motherSignature,
      candidateSignature,
      fatherSignature,
      secretaryOrResponsibleGroup,
    };

    await generateTemplatePdf(data)
      .then(() => {
        useCustomToast({
          toast,
          msg: "PDF exportado com sucesso!",
          type: "sucess",
        });
      })
      .finally(() => {
        setShowModal(false);
      });
  }

  return (
    <>
      <View w="100%" h="100%" bg="gray.200">
        <Header title="Ficha de Batismo" path="BaptismRecord" />
        <ScrollView>
          <VStack mt="7" space="5">
            <ButtonDefault
              buttonProps={{
                width: "80%",
                bg: "gray.500",
                borderRadius: "8",
                minH: "60",
                onPress: () => {
                  handlePress(0, "pastor");
                },
              }}
            >
              <Text fontSize="14" fontWeight="semibold" color="blue.400">
                Assinatura do pastor
              </Text>
            </ButtonDefault>
            <ButtonDefault
              buttonProps={{
                width: "80%",
                bg: "gray.500",
                borderRadius: "8",
                minH: "60",
                onPress: () => {
                  handlePress(1, "assinatura do pai");
                },
              }}
            >
              <Text fontSize="14" fontWeight="semibold" color="blue.400">
                Assinatura do pai ou responsável
              </Text>
            </ButtonDefault>
            <ButtonDefault
              buttonProps={{
                width: "80%",
                bg: "gray.500",
                borderRadius: "8",
                minH: "60",
                onPress: () => {
                  handlePress(2, "assinatura da mãe");
                },
              }}
            >
              <Text fontSize="14" fontWeight="semibold" color="blue.400">
                Assinatura da mãe ou responsável
              </Text>
            </ButtonDefault>
            <ButtonDefault
              buttonProps={{
                width: "80%",
                bg: "gray.500",
                borderRadius: "8",
                minH: "60",
                onPress: () => {
                  handlePress(3, "candidato");
                },
              }}
            >
              <Text fontSize="14" fontWeight="semibold" color="blue.400">
                Assinatura do Candidato
              </Text>
            </ButtonDefault>
            <ButtonDefault
              buttonProps={{
                width: "80%",
                bg: "gray.500",
                borderRadius: "8",
                minH: "60",
                onPress: () => {
                  handlePress(4, "secretária ou grupo responsável");
                },
              }}
            >
              <Text fontSize="14" fontWeight="semibold" color="blue.400">
                Assinatura da secretária da igreja ou grupo responsável
              </Text>
            </ButtonDefault>
          </VStack>

          <ButtonDefault
            buttonProps={{
              width: "80%",
              mt: 30,
              mb: 5,
              onPress: () => setShowModal(true),
            }}
          >
            <Text fontSize="14" fontWeight="semibold" color="white">
              Exportar PDF
            </Text>
          </ButtonDefault>
        </ScrollView>
      </View>
      <Signature
        getSignature={handleAddSignatures}
        show={show}
        onClose={handleClose}
      />
      <CustomDialog
        isOpen={showModal}
        setIsOpen={setShowModal}
        cancelMsg="Não"
        content={
          <>
            <Text fontSize="10">
              CREIO E ACEITO AS CRENÇAS FUNDAMENTAIS, NORMAS E PRINCÍPIOS DA
              IGREJA ADVENTISTA DO SÉTIMO DIA, INCLUSIVE A DISCIPLINA
              ECLESIÁSTICA, EXPRESSOS NO “MANUAL DA IGREJA” , E DESEJO SER
              MEMBRO DESTA CONGREGAÇÃO LOCAL DA IGREJA ADVENTISTA MUNDIAL.
            </Text>
            <Divider my="3" />

            <Text fontSize="10">
              COM A MINHA ASSINATURA DOU CONSENTIMENTO EXPRESSO PARA QUE A
              IGREJA ADVENTISTA DO SÉTIMO DIA TRATE MEUS DADOS PESSOAIS DE
              ACORDO COM A LEI, ESPECIFICAMENTE NO CUMPRIMENTO DE SUAS
              FINALIDADES INSTITUCIONAIS. A POLÍTICA DE PRIVACIDADE ESTÁ
              PUBLICADA NO SITE:
              <Text
                onPress={() => {
                  Linking.openURL("http://adv.st/privacidade");
                }}
                textDecorationLine="underline"
                color="blue.500"
              >
                {" "}
                Adv PRIVACIDADE
              </Text>
            </Text>
          </>
        }
        sucessMsg="Sim"
        onCancel={() => {
          setShowModal(false);
        }}
        onSuccess={handleSubmitData}
      />
    </>
  );
}

export default memo(Signatures);
