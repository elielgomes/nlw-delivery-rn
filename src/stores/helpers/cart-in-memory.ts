import { ProductProps } from "@/src/utils/data/products";
import { IProductCartProps } from "@/src/stores/cart-store";

export const addProduct = (
  products: IProductCartProps[],
  newProduct: ProductProps
) => {
  const productIndex = products.findIndex((item) => item.id === newProduct.id);
  if (productIndex === -1) {
    return [...products, { ...newProduct, quantity: 1 } as IProductCartProps];
  }
  const newProducts = [...products];
  newProducts[productIndex].quantity += 1;
  return newProducts;
};

export const removeProduct = (products: IProductCartProps[], id: string) => {
  const updatedProducts = products.map((product) =>
    product.id === id
      ? {
          ...product,
          quantity: product.quantity > 1 ? product.quantity - 1 : 0,
        }
      : product
  );

  return updatedProducts.filter((product) => product.quantity > 0);
};
