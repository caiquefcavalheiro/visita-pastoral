import { Box, Center, Text, VStack } from "native-base";
import { CustomModal } from "../../../../../../../components/customModal";
import { PersonModel } from "../../../../../../../database/entities/FamilieChurchPersonSermon";

interface Props {
  open: boolean;
  onClose: () => void;
  persons?: PersonModel[];
  position: string;
}

export const ModalPosition = ({ open, onClose, persons, position }: Props) => {
  return (
    <CustomModal
      open={open}
      onClose={() => {
        onClose();
      }}
      placement="center"
      header={position}
      headerProps={{
        borderBottomWidth: 0,
      }}
      textProps={{
        fontWeight: "bold",
        fontSize: "16",
      }}
      Content={
        <VStack space={4}>
          {!persons?.length && (
            <Center>
              <Text fontWeight="bold" fontSize={20}>
                Não ha pessoas nesse cargo
              </Text>
            </Center>
          )}

          {persons?.map((item) => (
            <Box key={item.id} borderWidth={2} px={2} borderRadius={10}>
              <Text>{item.name}</Text>
            </Box>
          ))}
        </VStack>
      }
    />
  );
};
