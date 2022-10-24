import { Box, Text, useToast, VStack } from "native-base";
import { useState } from "react";
import ButtonDefault from "../../components/button";
import { Header } from "../../components/Header";
import { useOrientation } from "../../contexts/OrientationProvider";
import { useFieldArray, useForm } from "react-hook-form";

import { useCustomToast } from "../../hooks";
import { Provider } from "./context";

interface BaptismRecordProps {}

const BaptismRecord = ({}: BaptismRecordProps) => {
  const [errors, setErrors] = useState({});

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);

  const [show, setShow] = useState(false);

  const toast = useToast();

  const {
    // formState: { errors },
    control,
  } = useForm<{
    signatures: Array<{ signature: string; currentUserName: string | null }>;
  }>({
    // resolver: yupResolver(schema),
  });

  const { append, fields, update } = useFieldArray({
    control,
    name: "signatures",
  });

  const handleAddBaptismRecord = (signature: string) => {
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

  const handleSubmitData = () => {
    useCustomToast({
      toast,
      msg: "PDF exportado com sucesso!",
      type: "sucess",
    });
  };

  console.log(errors, "errors");

  return (
    <>
      <Box w="100%" h="100%" bg="gray.200">
        <Provider>
          <Header title="Ficha de Batismo" path="Dashboard" />

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
              mt: 100,
              onPress: handleSubmitData,
            }}
          >
            <Text fontSize="20" fontWeight="semibold" color="white">
              Exportar PDF
            </Text>
          </ButtonDefault>
        </Provider>
      </Box>
    </>
  );
};

export default BaptismRecord;
