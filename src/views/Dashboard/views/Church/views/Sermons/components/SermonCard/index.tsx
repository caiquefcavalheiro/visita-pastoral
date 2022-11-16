import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import { HStack, Text } from "native-base";
import ButtonDefault from "../../../../../../../../components/button";
import { SermonModel } from "../../../../../../../../database/entities/FamilieChurchPersonSermon";
import { TouchableOpacity } from "react-native";
import { CustomDialog } from "../../../../../../../../components/CustomDialog";
import { useState } from "react";

interface SermonCardProps {
  sermon: SermonModel;
  onClick?: () => void;
  handleDelete: (sermon: SermonModel) => void;
}

const SermonCard = ({ sermon, onClick, handleDelete }: SermonCardProps) => {
  const [isOpenDeleteMsg, setIsOpenDeleteMsg] = useState(false);
  const formatDate = dayjs(sermon.createdAt).format("DD/MM/YYYY");

  return (
    <>
      <HStack alignItems="center">
        <ButtonDefault
          buttonProps={{
            backgroundColor: "yellow.500",
            w: "85%",
            onPress: onClick,
          }}
        >
          {sermon ? (
            <Text fontSize="18">{`${formatDate} - ${sermon.name}`}</Text>
          ) : null}
        </ButtonDefault>

        <TouchableOpacity
          onPress={() => {
            setIsOpenDeleteMsg(true);
          }}
        >
          <Feather name="trash" size={30} color="#9D0518" />
        </TouchableOpacity>
      </HStack>

      <CustomDialog
        setIsOpen={setIsOpenDeleteMsg}
        showTrigger={false}
        content={<Text>Tem certeza que deseja deletar este sermão ?</Text>}
        cancelMsg="Não"
        sucessMsg="Sim"
        onSuccess={() => {
          setIsOpenDeleteMsg(false);
          handleDelete(sermon);
        }}
        isOpen={isOpenDeleteMsg}
        onCancel={() => {
          setIsOpenDeleteMsg(false);
        }}
      />
    </>
  );
};

export default SermonCard;
