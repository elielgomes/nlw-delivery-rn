import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { Link } from "expo-router";

interface IHeaderProps {
  title: string;
  cartQuantityItems?: number;
}

export const Header: React.FC<IHeaderProps> = ({
  title,
  cartQuantityItems = 0,
}) => {
  return (
    <View className="flex-row items-center border-b border-slate-700 pb-5 mx-5">
      <View className="flex-1">
        <Image source={require("@/src/assets/logo.png")} className="h-6 w-32" />
        <Text className="text-white text-xl font-heading mt-2">{title}</Text>
      </View>

      {cartQuantityItems > 0 && (
        <Link href="/cart" asChild>
					<TouchableOpacity className="relative">
						<View className="bg-lime-300 w-4 h-4 rounded-full absolute items-center justify-center -top-2 z-10 -right-2">
							<Text className="text-slate-900 text-xs font-bold">
								{cartQuantityItems}
							</Text>
						</View>
						<Feather name="shopping-bag" color={colors.white} size={24} />
					</TouchableOpacity>
				</Link>
      )}
    </View>
  );
};
