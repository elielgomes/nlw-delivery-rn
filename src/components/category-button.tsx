import { Text, Pressable, PressableProps } from "react-native";
import clsx from "clsx";

interface ICategoryByttonProps extends PressableProps {
  title: string;
  isSelected?: boolean;
}

export const CategoryButton: React.FC<ICategoryByttonProps> = ({
  title,
  isSelected,
  ...rest
}) => {
  return (
    <Pressable
      className={clsx(
        "bg-slate-800 px-4 justify-center rounded-md h-10 border-2 border-transparent",
        isSelected && "border-lime-300"
      )}
      {...rest}
    >
      <Text className="text-slate-100 font-subtitle text-sm">{title}</Text>
    </Pressable>
  );
};
