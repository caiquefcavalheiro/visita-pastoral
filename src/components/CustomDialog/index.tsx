import { AlertDialog, Button, Center } from "native-base";
import { useRef } from "react";

type CustomDialogProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  headerMsg?: string;
  content: JSX.Element;
  cancelMsg: string;
  sucessMsg: string;
  onSuccess: () => void;
  onCancel: () => void;
};

export function CustomDialog({
  isOpen,
  setIsOpen,
  headerMsg,
  content,
  cancelMsg,
  sucessMsg,
  onSuccess,
  onCancel,
}: CustomDialogProps) {
  const onClose = () => setIsOpen(false);

  const cancelRef = useRef(null);
  return (
    <Center>
      <Button colorScheme="danger" onPress={() => setIsOpen(!isOpen)}>
        Delete Customer
      </Button>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          {headerMsg && <AlertDialog.Header>{headerMsg}</AlertDialog.Header>}
          <AlertDialog.Body mt="3">{content}</AlertDialog.Body>
          <AlertDialog.Footer justifyContent="center">
            <Button.Group space={8}>
              <Button colorScheme="danger" onPress={onCancel} w="100">
                {cancelMsg}
              </Button>
              <Button
                w="100"
                colorScheme="green"
                onPress={onSuccess}
                ref={cancelRef}
              >
                {sucessMsg}
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
}
