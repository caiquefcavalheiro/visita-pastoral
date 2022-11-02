import React from "react";
import { IModalProps, Modal } from "native-base";

interface Props {
  header?: string;
  Footer?: JSX.Element;
  Content: JSX.Element;
  open?: boolean;
  onClose?: () => void;
  placement: "center" | "bottom" | "left" | "right" | "top";
  contentStyle?: IModalProps;
}

export const CustomModal = ({
  header,
  Footer = <></>,
  Content,
  open = false,
  onClose = () => {},
  placement = "center",
  contentStyle,
  ...rest
}: Props) => {
  return (
    <Modal isOpen={open} onClose={onClose} safeAreaTop={true} {...rest}>
      <Modal.Content
        {...{
          ...styles[placement],
          ...{
            maxWidth: "95%",
            minH: "95%",
          },
          ...contentStyle,
        }}
      >
        <Modal.CloseButton />
        {header && <Modal.Header>{header}</Modal.Header>}
        <Modal.Body h="100%">{Content}</Modal.Body>
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
