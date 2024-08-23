import { create } from "zustand";

export const useCart = create((set) => ({
  cartProducts: [],
  checkout: [],

  addToCart: (product) =>
    set((state) => ({
      cartProducts: [
        ...state.cartProducts,
        { ...product, totalPrice: product.price, amount: 1 },
      ],
    })),

  removeFromCart: (id) =>
    set((state) => ({
      cartProducts: state.cartProducts.filter((product) => product._id !== id),
    })),

  addProductAmount: (id) =>
    set((state) => ({
      cartProducts: state.cartProducts.map((product) =>
        product._id === id
          ? {
              ...product,
              amount: product.amount + 1,
              totalPrice: product.price * (product.amount + 1),
            }
          : product
      ),
    })),

  minusProductAmount: (id) =>
    set((state) => ({
      cartProducts: state.cartProducts.map((product) =>
        product._id === id && product.amount > 1
          ? {
              ...product,
              amount: product.amount - 1,
              totalPrice: product.price * (product.amount - 1),
            }
          : product
      ),
    })),

  removeProducts: () =>
    set((state) => ({
      checkout: state.cartProducts,
      cartProducts: [],
    })),

  revert: () =>
    set((state) => ({
      cartProducts: state.checkout,
    })),
}));
