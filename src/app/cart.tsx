import React, { useState } from "react";
import { Text, View, ScrollView, Alert, Linking } from "react-native";
import { Header } from "@/src/components/header";
import { Product } from "@/src/components/product";
import { useCartStore } from "@/src/stores/cart-store";
import { formatCurrency } from "@/src/utils/functions/format-currency";
import { Input } from "@/src/components/input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "@/src/components/button";
import { Feather } from "@expo/vector-icons";
import { LinkButton } from "@/src/components/link-button";
import { IProductCartProps } from "@/src/stores/cart-store";
import { useNavigation } from "expo-router";

const PHONE_NUMBER = "5516997835942";

const Cart = () => {
  const cartStore = useCartStore();
  const [address, setAddress] = useState("");

  const navigation = useNavigation();

  const total = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  );

  const handleProductRemove = (product: IProductCartProps) => {
    Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
      {
        text: "Cancelar",
      },
      {
        text: "Remover",
        onPress: () => cartStore.removeProduct(product.id),
      },
    ]);
  };

  const handleOrder = () => {
    if (address.trim() === "") {
      return Alert.alert("Pedido", "Informe os dados da entrega.");
    }

    const products = cartStore.products
      .map((product) => `\n ${product.quantity} - ${product.title}`)
      .join("");

    const message = `
		🍔 NOVO PEDIDO 
		\n Entregar em: ${address}
		${products}
		\n Valor total: ${total}
		`;

    Linking.openURL(
      `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`
    );
		
    cartStore.clearCart();
    navigation.goBack();
  };

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />
      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="flex-1 p-5">
            {cartStore.products.length > 0 ? (
              <View className="border-b border-slate-700">
                {cartStore.products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleProductRemove(product)}
                  />
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Seu carrinho está vazio.
              </Text>
            )}
            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white text-xl font-subtitle">Total:</Text>
              <Text className="text-lime-400 text-2xl font-heading">
                {total}
              </Text>
            </View>
            <Input
              placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."
              onChangeText={setAddress}
              onSubmitEditing={handleOrder}
              blurOnSubmit={true}
              returnKeyType="send"
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View className="p-5 gap-5">
        <Button onPress={handleOrder}>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>
        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
};

export default Cart;
