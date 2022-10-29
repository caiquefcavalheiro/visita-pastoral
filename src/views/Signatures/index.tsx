import { Box, ScrollView, Text, useToast, VStack } from "native-base";
import { useState } from "react";
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

interface SignaturesProps {}

const Signatures = ({}: SignaturesProps) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);

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

    console.log(pdfName, "pdfName");

    await FileSystem.moveAsync({
      from: uri,
      to: pdfName,
    });

    await shareAsync(pdfName, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const handleSubmitData = async () => {
    const pastorSignature = fields.find(
      (field) => field.currentUserName === "pastor"
    );

    const secretaryOrResponsibleGroup = fields.find(
      (field) => field.currentUserName === "secretária ou grupo responsável"
    );

    const candidateSignature = fields.find(
      (field) => field.currentUserName === "candidato"
    );

    if (!secretaryOrResponsibleGroup && !pastorSignature) {
      useCustomToast({
        toast,
        msg: "È necessário a assinatura do pastor ou secretaria !",
        type: "error",
      });
    } else if (!candidateSignature) {
      useCustomToast({
        toast,
        msg: "A assinatura do canditato é obrigatória !",
        type: "error",
      });
    } else {
      useCustomToast({
        toast,
        msg: "PDF exportado com sucesso!",
        type: "sucess",
      });
    }

    const html = getTemplate({ fields });

    await printToFile(html);
  };

  return (
    <>
      <Box w="100%" h="100%" bg="gray.200" pb="10">
        <Header title="Ficha de Batismo" path="Dashboard" />
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
                  handlePress(1, "responsável");
                },
              }}
            >
              <Text fontSize="20" fontWeight="semibold" color="blue.400">
                Assinatura do responsável
              </Text>
            </ButtonDefault>
            <ButtonDefault
              buttonProps={{
                width: "80%",
                bg: "gray.500",
                borderRadius: "8",
                h: "76",
                onPress: () => {
                  handlePress(2, "candidato");
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
                  handlePress(3, "secretária ou grupo responsável");
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
