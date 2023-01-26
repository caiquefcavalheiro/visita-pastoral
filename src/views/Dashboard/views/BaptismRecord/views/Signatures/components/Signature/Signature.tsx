import { Center, Divider, Flex, HStack, Text, View, VStack } from "native-base";
import React, { memo, useRef, useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { SignatureView } from "../../../../../../../../components/Signature";
import { Dimensions } from "react-native";
const { height } = Dimensions.get("window");

interface SignatureProps {
  show?: boolean;
  onClose?: () => void;
  getSignature: (signature: string) => void;
}

function Signature({ show = false, getSignature, onClose }: SignatureProps) {
  const signatureRef = useRef({} as any);
  const [signature, setSignature] = useState("");

  function handleSave() {
    signatureRef?.current?.saveSignature();
    getSignature(signature);
    signatureRef?.current?.clearSignature();
  }
  function handleClear() {
    signatureRef?.current?.clearSignature();
  }
  function handleBack() {
    onClose?.();
  }

  return (
    <Flex w="100%" h="100%" position="absolute" zIndex={show ? 15 : -10}>
      <SafeAreaView
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
        }}
      >
        <Flex flex={1}>
          <SignatureView
            ref={signatureRef}
            onSave={(val: string) => {
              setSignature(val);
            }}
            onClear={() => {
              setSignature("");
            }}
            backgroundColor="rgba(255,255,255,0.01)"
            maxWidth={3}
          />
        </Flex>

        <VStack h="100%" w="50" bg="yellow.50">
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
            onPress={handleBack}
          >
            <Text
              fontSize="20"
              style={{
                transform: [{ rotate: "-90deg" }],
                writingDirection: "rtl",
              }}
              h="6"
              w="40"
              textAlign="center"
            >
              Voltar
            </Text>
          </TouchableOpacity>

          <Divider orientation="horizontal" my="3" bg="gray.600" />

          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
            onPress={handleSave}
          >
            <Text
              fontSize="20"
              style={{
                transform: [{ rotate: "-90deg" }],
                writingDirection: "rtl",
              }}
              h="6"
              w="40"
              textAlign="center"
            >
              Salvar
            </Text>
          </TouchableOpacity>

          <Divider orientation="horizontal" my="3" bg="gray.600" />

          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
            onPress={handleClear}
          >
            <Text
              fontSize="20"
              style={{
                transform: [{ rotate: "-90deg" }],
                writingDirection: "auto",
              }}
              h="6"
              w="40"
              textAlign="center"
            >
              Limpar
            </Text>
          </TouchableOpacity>
        </VStack>
      </SafeAreaView>
    </Flex>
  );
}

export default memo(Signature);
