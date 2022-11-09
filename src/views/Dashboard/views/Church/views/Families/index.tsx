import { EvilIcons } from "@expo/vector-icons";
import { debounce, orderBy } from "lodash";
import { Box, Center, FlatList, Flex, View } from "native-base";
import { useCallback, useEffect, useState } from "react";
import CustomInput from "../../../../../../components/customInput";
import { Header } from "../../../../../../components/Header";
import { useDatabaseConnection } from "../../../../../../database/connection";
import { FamilieModel } from "../../../../../../database/entities/FamilieChurchPersonSermon";
import useFamilieService from "../../../../../../database/services/familieService";
import { orderByDate } from "../../../../../../utils";
import { ModalCreateFamilie } from "../../../../components/ModalCreateFamilie";
import Row from "./components/Row";
import OrderButton from "./components/Row/OrderButton";

const Families = ({ route }: any) => {
  const church = route?.params?.church;

  const [families, setFamilies] = useState<FamilieModel[]>([]);

  const [search, setSeach] = useState("");

  const [currentFamilie, setCurrentFamilie] = useState<FamilieModel | null>(
    null
  );

  const [open, setOpen] = useState(false);

  const { connection } = useDatabaseConnection();

  const familie = useFamilieService(connection);

  const getAllFamilies = useCallback(() => {
    familie.getAll().then((resp) => {
      const filteredFamilies = resp.filter((familie) => {
        return familie?.church?.id === church?.id;
      });
      setFamilies(filteredFamilies);
    });
  }, []);

  useEffect(() => {
    getAllFamilies();
  }, []);

  const handleSeach = debounce((text) => {
    setSeach(text);
  }, 700);

  const filteredFamilies = families?.filter((item) => {
    if (search) {
      return item.name.includes(search);
    }
    return item;
  });

  return (
    <View w="100%" h="100%" bg="gray.200">
      <Header title="Famílias" path="Church" />

      <Center px="9%" my="10">
        <CustomInput
          name="cityChurchOrganizedGroup"
          inputProps={{
            onChangeText: handleSeach,
          }}
          InputRightElement={
            <Box pr="3">
              <EvilIcons name="search" size={30} />
            </Box>
          }
          px={10}
        />

        <Flex w="100%" alignItems="flex-end" mt={4} pr={4}>
          <OrderButton
            actions={{
              0: () => {
                setFamilies(
                  orderBy(
                    families,
                    [(familie) => familie.name.toLowerCase()],
                    ["asc"]
                  )
                );
              },
              1: () => {
                const familieSorted = [...families].sort((a, b) => {
                  if (a?.createdAt && b?.createdAt) {
                    return orderByDate(a.createdAt, b.createdAt);
                  }

                  return -1;
                });

                setFamilies(familieSorted);
              },
            }}
          />
        </Flex>
      </Center>
      <FlatList
        data={filteredFamilies}
        px={10}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={() => <View my={2} />}
        renderItem={({ item }) => (
          <Row
            name={item.name}
            onPress={() => {
              setCurrentFamilie(item);
              setOpen(true);
            }}
          />
        )}
      />

      <ModalCreateFamilie
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        {...(currentFamilie && {
          defaultValues: currentFamilie,
        })}
        {...(currentFamilie && {
          currentFamilie,
        })}
        handleSave={getAllFamilies}
      />
    </View>
  );
};

export default Families;
