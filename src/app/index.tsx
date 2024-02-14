import React, { useState, useRef } from "react";
import { FlatList, View, SectionList, Text, Image } from "react-native";
import { CATEGORIES, MENU, ProductProps} from "@/src/utils/data/products";
import { useCartStore } from "@/src/stores/cart-store";

// Components
import { Header } from "@/src/components/header";
import { CategoryButton } from "@/src/components/category-button";
import { Product } from "@/src/components/product";

import { Link } from "expo-router";

const App = () => {
  const cartStore = useCartStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    CATEGORIES[0]
  );

  const sectioListRef = useRef<SectionList<ProductProps>>(null);

  const handleCategorySelection = (category: string) => {
    setSelectedCategory(category);
    const sectionIndex = CATEGORIES.indexOf(category);
    if (sectioListRef.current) {
      sectioListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      });
    }
  };

  const cartQuantityItems = cartStore.products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  return (
    <View className="pt-8 flex-1">
      <Header title="Faça seu pedido" cartQuantityItems={cartQuantityItems} />
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          return (
            <CategoryButton
              title={item}
              onPress={() => handleCategorySelection(item)}
              isSelected={selectedCategory === item}
            />
          );
        }}
        horizontal
        className="max-h-10 mt-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />

      <SectionList
        ref={sectioListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => {
          return (
            <Text className="font-heading mt-8 mb-3 text-white text-xl">
              {title}
            </Text>
          );
        }}
        className="p-5 flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};
export default App;
