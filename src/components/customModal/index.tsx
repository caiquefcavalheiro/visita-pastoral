import React from "react";
import {
  IModalProps,
  ITextProps,
  KeyboardAvoidingView,
  Modal,
  Text,
} from "native-base";
import { InterfaceBoxProps } from "native-base/lib/typescript/components/primitives/Box";

interface Props {
  header?: string;
  Footer?: JSX.Element;
  Content: JSX.Element;
  open?: boolean;
  onClose?: () => void;
  placement: "center" | "bottom" | "left" | "right" | "top";
  contentStyle?: IModalProps;
  headerProps?: InterfaceBoxProps<IModalProps>;
  textProps?: ITextProps;
}

export const CustomModal = ({
  header,
  Footer = <></>,
  Content,
  open = false,
  onClose = () => {},
  placement = "center",
  contentStyle,
  headerProps,
  textProps,
  ...rest
}: Props) => {
  return (
    <Modal isOpen={open} onClose={onClose} safeAreaTop={true} {...rest}>
      <Modal.Content
        {...{
          ...styles[placement],
          ...contentStyle,
        }}
      >
        <Modal.CloseButton />
        {header && (
          <Modal.Header {...headerProps}>
            <Text {...textProps}>{header}</Text>
          </Modal.Header>
        )}

        <KeyboardAvoidingView behavior="padding">
          <Modal.Body minH="100%" pb="20">
            {Content}
          </Modal.Body>
        </KeyboardAvoidingView>
        {Footer}
      </Modal.Content>
    </Modal>
  );
};

const styles = {
  top: {
    marginBottom: "auto",
    marginTop: 0,
  },
  bottom: {
    marginBottom: 0,
    marginTop: "auto",
  },
  left: {
    marginLeft: 0,
    marginRight: "auto",
  },
  right: {
    marginLeft: "auto",
    marginRight: 0,
  },
  center: {},
};
