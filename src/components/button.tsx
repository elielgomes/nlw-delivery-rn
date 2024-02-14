import React, { ReactNode } from "react";
import {
  TouchableOpacityProps,
  TouchableOpacity,
  Text,
  TextProps,
} from "react-native";

interface IButtonProps extends TouchableOpacityProps {
  children: ReactNode;
}

interface IButtonTextProps {
  children: ReactNode;
}

interface IButtonIconProps {
  children: ReactNode;
}

const Button = ({ children, ...rest }: IButtonProps) => {
  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.7}
      className="h-12 bg-lime-400 rounded-md items-center justify-center flex-row"
    >
      {children}
    </TouchableOpacity>
  );
};

const ButtonText = ({ children }: IButtonTextProps) => {
  return (
    <Text className="text-black font-heading text-base mx-2">{children}</Text>
  );
};

const ButtonIcon = ({ children }: IButtonIconProps) => {
  return children;
};

Button.Text = ButtonText;
Button.Icon = ButtonIcon;

export { Button };
