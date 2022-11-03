import { Divider, HStack, Text, View } from "native-base";
import React, { memo, useRef, useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { SignatureView } from "../../../../../../../../components/Signature";

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
  }
  function handleClear() {
    signatureRef?.current?.clearSignature();
  }
  function handleBack() {
    onClose?.();
  }

  return (
    <View w="100%" h="100%" position="absolute" zIndex={show ? 15 : -10}>
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
          backgroundColor="rgba(255,255,255,0.01)"
          maxWidth={3}
        />
      </SafeAreaView>

      <HStack h="50" bg="yellow.50">
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          onPress={handleBack}
        >
          <Text fontSize="20">Voltar</Text>
        </TouchableOpacity>

        <Divider orientation="vertical" mx="3" bg="gray.600" />

        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
          onPress={handleSave}
        >
          <Text fontSize="20">Salvar</Text>
        </TouchableOpacity>

        <Divider orientation="vertical" mx="3" bg="gray.600" />

        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          onPress={handleClear}
        >
          <Text fontSize="20">Limpar</Text>
        </TouchableOpacity>
      </HStack>
    </View>
  );
}

export default memo(Signature);
