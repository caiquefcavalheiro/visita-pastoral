import { Divider, ScrollView, Text, useToast, View, VStack } from "native-base";
import { memo, useEffect, useState } from "react";
import ButtonDefault from "../../../../../../components/button";
import { Header } from "../../../../../../components/Header";
import Signature from "./components/Signature/Signature";
import { useFieldArray, useForm } from "react-hook-form";
import { useCustomToast } from "../../../../../../hooks";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";
import dayjs from "dayjs";
import { BaptismRecordData } from "../..";
import { useOrientation } from "../../../../../../hooks/orientation";
import { CustomDialog } from "../../../../../../components/CustomDialog";
import { Dimensions, Linking } from "react-native";
import { getTemplate } from "./template";

const { fontScale } = Dimensions.get("window");

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

  const { toggleOrientation } = useOrientation();

  async function handleAddSignatures(signature: string) {
    if (currentIndex !== null && fields?.[currentIndex]) {
      update(currentIndex, { signature, currentUserName });
    } else {
      append({ signature, currentUserName });
    }
    setShow(false);
    toggleOrientation("vertical");
  }

  function handlePress(index: number, name: string) {
    setCurrentIndex(index);
    setCurrentUserName(name);
    setShow(true);
    toggleOrientation("horizontal");
  }

  function handleClose() {
    toggleOrientation("vertical");
    setShow(false);
  }

  async function printToFile(html: string) {
    const currentDate = dayjs(new Date()).format("DD-MM-YYYY_mm-ss");
    const { uri } = await printToFileAsync({
      html,
      width: 2408,
      height: 3508,
    });

    const pdfName = `${uri.slice(
      0,
      uri.lastIndexOf("/") + 1
    )}ficha-batismo_${currentDate}.pdf`;

    await FileSystem.moveAsync({
      from: uri,
      to: pdfName,
    });

    await shareAsync(pdfName, { UTI: ".pdf", mimeType: "application/pdf" });
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

    const html = getTemplate(data, fontScale);

    await printToFile(html).then(() => {
      useCustomToast({
        toast,
        msg: "PDF exportado com sucesso!",
        type: "sucess",
      });
    });
    setShowModal(false);
  }

  useEffect(() => {
    toggleOrientation("vertical");
  }, []);

  return (
    <>
      <View w="100%" h="100%" bg="gray.200">
        <Header title="Ficha de Batismo" path="BaptismRecord" />
        <ScrollView>
          <VStack mt="20" space="16">
            <ButtonDefault
              buttonProps={{
                width: "80%",
                bg: "gray.500",
                borderRadius: "8",
                minH: "76",
                onPress: () => {
                  handlePress(0, "pastor");
                },
              }}
            >
              <Text fontSize="20" fontWeight="semibold" color="blue.400">
                Assinatura do pastor
              </Text>
            </ButtonDefault>
            <ButtonDefault
              buttonProps={{
                width: "80%",
                bg: "gray.500",
                borderRadius: "8",
                minH: "76",
                onPress: () => {
                  handlePress(1, "assinatura do pai");
                },
              }}
            >
              <Text fontSize="20" fontWeight="semibold" color="blue.400">
                Assinatura do pai ou responsável
              </Text>
            </ButtonDefault>
            <ButtonDefault
              buttonProps={{
                width: "80%",
                bg: "gray.500",
                borderRadius: "8",
                minH: "76",
                onPress: () => {
                  handlePress(2, "assinatura da mãe");
                },
              }}
            >
              <Text fontSize="20" fontWeight="semibold" color="blue.400">
                Assinatura da mãe ou responsável
              </Text>
            </ButtonDefault>
            <ButtonDefault
              buttonProps={{
                width: "80%",
                bg: "gray.500",
                borderRadius: "8",
                minH: "76",
                onPress: () => {
                  handlePress(3, "candidato");
                },
              }}
            >
              <Text fontSize="20" fontWeight="semibold" color="blue.400">
                Assinatura do Candidato
              </Text>
            </ButtonDefault>
            <ButtonDefault
              buttonProps={{
                width: "80%",
                bg: "gray.500",
                borderRadius: "8",
                minH: "76",
                onPress: () => {
                  handlePress(4, "secretária ou grupo responsável");
                },
              }}
            >
              <Text fontSize="20" fontWeight="semibold" color="blue.400">
                Assinatura da secretária da igreja ou grupo responsável
              </Text>
            </ButtonDefault>
          </VStack>

          <ButtonDefault
            buttonProps={{
              width: "80%",
              mt: 50,
              mb: 60,
              onPress: () => setShowModal(true),
            }}
          >
            <Text fontSize="20" fontWeight="semibold" color="white">
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
