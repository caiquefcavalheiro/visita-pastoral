import * as ImagePicker from "expo-image-picker";
import {
  FormControl,
  IButtonProps,
  ITextProps,
  Stack,
  Text,
} from "native-base";
import {
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
  useController,
  UseControllerProps,
} from "react-hook-form";
import ButtonDefault from "../button";

type ImageButtonProps = {
  control?: Control<any>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  rules?: UseControllerProps["rules"];
  label?: string;
  name: string;
  buttonStyles?: IButtonProps;
  textButton: string;
};

const defaultLabelStyle: ITextProps = {
  fontSize: "20",
};
const defaultButtonStyle: IButtonProps = {
  width: "100%",
};

export default function ImageButton({
  control,
  error,
  rules,
  label,
  name,
  buttonStyles,
  textButton,
}: ImageButtonProps) {
  const {
    field: { onChange },
  } = useController({ name, control, rules });

  const fetchImageFromUri = async (
    uri: string,
    handleLoad: (file: string | ArrayBuffer | null) => void
  ): Promise<string | void> => {
    fetch(uri)
      .then((res) => res.blob())
      .then((data) => {
        const reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onloadend = () => {
          handleLoad(reader.result);
        };
      });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result?.uri) {
      await fetchImageFromUri(result.uri, (file) => {
        if (file) onChange(file);
      });
    }
  };

  return (
    <Stack space={1} w="100%">
      <FormControl w="100%" isInvalid={error ? true : false}>
        {label && (
          <FormControl.Label {...defaultLabelStyle}>
            <Text {...defaultLabelStyle}>{label}</Text>
          </FormControl.Label>
        )}
        <ButtonDefault
          buttonProps={{
            ...defaultButtonStyle,
            ...buttonStyles,
            onPress: pickImage,
          }}
        >
          <Text fontSize="20" fontWeight="semibold" color="white">
            {textButton}
          </Text>
        </ButtonDefault>
        {error && (
          <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
        )}
      </FormControl>
    </Stack>
  );
}
