import {
  FormControl,
  IButtonProps,
  ITextProps,
  Stack,
  Text,
  useDisclose,
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
import { CameraAndGalery } from "../CameraAndGalery";

type ImageButtonProps = {
  control?: Control<any>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  rules?: UseControllerProps["rules"];
  label?: string;
  name: string;
  buttonStyles?: IButtonProps;
  textButton: string;
  textProps: ITextProps;
};

const defaultLabelStyle: ITextProps = {
  fontSize: "18",
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
  textProps,
}: ImageButtonProps) {
  const { isOpen, onClose, onOpen } = useDisclose();

  const {
    field: { onChange },
  } = useController({ name, control, rules });

  return (
    <>
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
              onPress: onOpen,
            }}
          >
            <Text
              fontSize="20"
              fontWeight="semibold"
              color="white"
              {...textProps}
            >
              {textButton}
            </Text>
          </ButtonDefault>
          {error && (
            <FormControl.ErrorMessage>
              {error?.message}
            </FormControl.ErrorMessage>
          )}
        </FormControl>
      </Stack>
      <CameraAndGalery
        isOpen={isOpen}
        onClose={onClose}
        handleSelectImage={(image) => {
          onChange(image);
        }}
      />
    </>
  );
}
