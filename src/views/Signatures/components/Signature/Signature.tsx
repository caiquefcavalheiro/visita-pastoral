import { Box, Divider, HStack, Text } from "native-base";
import React, { useRef, useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { SignatureView } from "../../../../components/Signature";

interface SignatureProps {
  show?: boolean;
  onClose?: () => void;
  getSignature: (signature: string) => void;
}

const Signature = ({ show = false, getSignature, onClose }: SignatureProps) => {
  const signatureRef = useRef({} as any);
  const [signature, setSignature] = useState("");

  if (!show) return <></>;

  return (
    <Box w="100%" h="100%" position="absolute" zIndex={15} bg="red.500">
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <SignatureView
          ref={signatureRef}
          onSave={(val: string) => {
            setSignature(val);
          }}
          onClear={() => {
            setSignature("");
          }}
          backgroundColor="#ffffff"
        />
      </SafeAreaView>

      <HStack h="50" bg="yellow.50">
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          onPress={() => {
            onClose?.();
          }}
        >
          <Text fontSize="20">Voltar</Text>
        </TouchableOpacity>

        <Divider orientation="vertical" mx="3" bg="gray.600" />

        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          onPress={() => {
            signatureRef?.current?.saveSignature();
            getSignature(signature);
            onClose?.();
          }}
        >
          <Text fontSize="20">Salvar</Text>
        </TouchableOpacity>
        <Divider orientation="vertical" mx="3" bg="gray.600" />

        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          onPress={() => {
            signatureRef?.current?.clearSignature();
          }}
        >
          <Text fontSize="20">Limpar</Text>
        </TouchableOpacity>
      </HStack>
    </Box>
  );
};

export default Signature;
