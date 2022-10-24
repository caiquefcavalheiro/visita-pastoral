import { Box, Text } from "native-base";

type toastProps = {
  msg: string;
  duration?: number;
  toast: any;
  type?: "sucess" | "error";
  [rest: string]: any;
};

export const useCustomToast = ({
  toast,
  msg,
  type = "sucess",
  ...rest
}: toastProps) => {
  toast.show({
    render: () => {
      return (
        <Box
          zIndex="99999999999999"
          bg={type === "error" ? "red.500" : "emerald.500"}
          px="2"
          py="1"
          rounded="sm"
          mb={5}
        >
          <Text color="white" fontSize="15">
            {msg}
          </Text>
        </Box>
      );
    },
    ...rest,
  });
};
