import { Button, IButtonProps, Image, IImageProps } from "native-base";
import { ReactNode } from "react";
interface ButtonProps {
  imageProps?: IImageProps;
  buttonProps?: IButtonProps;
  children: ReactNode;
}

const buttonDefaultStyle: IButtonProps = {
  pt: 18,
  pb: 18,
  px: 25,
  ml: "auto",
  mr: "auto",
  mb: 0,
  borderRadius: 15,
  bg: "blue.300",
};

const imageDefaultStyle: IImageProps = {
  ml: "10%",
  alt: "image",
  height: "24",
  width: "24",
};

const ButtonDefault = ({
  children,
  buttonProps = buttonDefaultStyle,
  imageProps,
}: ButtonProps) => {
  return !imageProps?.source && !imageProps?.src ? (
    <Button {...{ ...buttonDefaultStyle, ...buttonProps }}>{children}</Button>
  ) : (
    <Button
      {...{ ...buttonDefaultStyle, ...buttonProps }}
      endIcon={<Image {...{ ...imageDefaultStyle, ...imageProps }}></Image>}
    >
      {children}
    </Button>
  );
};

export default ButtonDefault;
