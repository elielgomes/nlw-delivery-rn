import React from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { useLocalSearchParams, useNavigation, Redirect } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { PRODUCTS } from "@/src/utils/data/products";
import { formatCurrency } from "@/src/utils/functions/format-currency";
import { Button } from "@/src/components/button";
import { LinkButton } from "@/src/components/link-button";
import { useCartStore } from "@/src/stores/cart-store";

const Product = () => {
  const { id } = useLocalSearchParams();
  const cartStore = useCartStore();
  const navigation = useNavigation();

  const product = PRODUCTS.find((item) => item.id === id);

  const handleAddProductToCart = () => {
    if (product) {
      cartStore.addProduct(product);
      navigation.goBack();
    }
  };

  return !product ? (
    <Redirect href="/" />
  ) : (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <Image
        source={product.cover}
        className="w-full h-52"
        resizeMode="cover"
      />
      <View className="p-5 mt-8 flex-1">
				<Text className="text-xl font-heading text-white">{product.title}</Text>
        <Text className="text-lime-400 text-2xl font-heading my-2">
          {formatCurrency(product.price)}
        </Text>

        <Text className="text-slate-400 font-body text-base leading-6 mb-6">
          {product.description}
        </Text>

        {product.ingredients.map((ingredient) => (
          <Text
            key={ingredient}
            className="text-slate-400 font-body text-base leading-6"
          >
            {"\u2022 " + ingredient}
          </Text>
        ))}
      </View>
      <View className="p-5 pb-8 gap-5">
        <Button onPress={handleAddProductToCart}>
          <Button.Icon>
            <Feather name="plus-circle" size={20} color="black" />
          </Button.Icon>
          <Button.Text>Adicionar ao carrinho</Button.Text>
        </Button>
        <LinkButton href="/" title="Voltar ao cardápio" />
      </View>
    </ScrollView>
  );
};

export default Product;
