import { Box, ScrollView, Text, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import ButtonDefault from "../../components/button";
import { Header } from "../../components/Header";
import { useOrientation } from "../../contexts/OrientationProvider";
import Signature from "./components/Signature/Signature";
import { useFieldArray, useForm } from "react-hook-form";
import { useCustomToast } from "../../hooks";
import { getTemplate } from "./template";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";
import dayjs from "dayjs";
import { getStorage } from "../../utils/storage";
import { BaptismRecordData } from "../BaptismRecord";

interface SignaturesProps {}

const Signatures = ({}: SignaturesProps) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);

  const [baptismRecordData, setBaptismRecordData] = useState(
    {} as BaptismRecordData
  );

  const [show, setShow] = useState(false);

  const toast = useToast();

  const { control } = useForm<{
    signatures: Array<{ signature: string; currentUserName: string | null }>;
  }>();

  const { append, fields, update } = useFieldArray({
    control,
    name: "signatures",
  });

  const handleAddSignatures = (signature: string) => {
    if (currentIndex !== null && fields?.[currentIndex]) {
      update(currentIndex, { signature, currentUserName });
    } else {
      append({ signature, currentUserName });
    }
    toggleOrientation("vertical");
  };

  const { toggleOrientation } = useOrientation();

  const handlePress = (index: number, name: string) => {
    toggleOrientation("horizontal");
    setCurrentIndex(index);
    setCurrentUserName(name);
    setShow(!show);
  };
  const currentDate = dayjs(new Date()).format("DD-MM-YYYY_mm:ss");

  const printToFile = async (html: string) => {
    const { uri } = await printToFileAsync({
      html,
      width: 2408,
      height: 3508,
      margins: { top: 200, right: 20, left: 20, bottom: 200 },
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
  };

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

  const handleSubmitData = async () => {
    if (!secretaryOrResponsibleGroup && !pastorSignature) {
      useCustomToast({
        toast,
        msg: "È necessário a assinatura do pastor ou secretaria !",
        type: "error",
      });
    } else if (!fatherSignature && !motherSignature) {
      useCustomToast({
        toast,
        msg: "È necessário a assinatura da mãe, pai ou responsável !",
        type: "error",
      });
    } else if (!candidateSignature) {
      useCustomToast({
        toast,
        msg: "A assinatura do canditato é obrigatória !",
        type: "error",
      });
    } else {
      const data = {
        ...baptismRecordData,
        pastorSignature,
        motherSignature,
        candidateSignature,
        fatherSignature,
        secretaryOrResponsibleGroup,
      };
      const html = getTemplate(data);

      await printToFile(html).then(() => {
        useCustomToast({
          toast,
          msg: "PDF exportado com sucesso!",
          type: "sucess",
        });
      });
    }
  };

  useEffect(() => {
    (async () => {
      const data = (await getStorage(
        "@pastoral:baptismRecordData"
      )) as BaptismRecordData;
      setBaptismRecordData(data);
    })();
  }, []);

  return (
    <>
      <Box w="100%" h="100%" bg="gray.200">
        <Header title="Ficha de Batismo" path="BaptismRecord" />
        <ScrollView>
          <VStack mt="20" space="16">
            <ButtonDefault
              buttonProps={{
                width: "80%",
                bg: "gray.500",
                borderRadius: "8",
                h: "76",
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
                h: "76",
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
                h: "76",
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
                h: "76",
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
              onPress: handleSubmitData,
            }}
          >
            <Text fontSize="20" fontWeight="semibold" color="white">
              Exportar PDF
            </Text>
          </ButtonDefault>
        </ScrollView>
      </Box>
      <Signature
        getSignature={handleAddSignatures}
        show={show}
        onClose={() => {
          setShow(false);
          toggleOrientation("vertical");
        }}
      />
    </>
  );
};

export default Signatures;
