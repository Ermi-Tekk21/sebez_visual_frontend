import { create } from "zustand";

export const useCart = create((set) => ({
  cartProducts: [],
  checkout: [],

  addToCart: (product) =>
    set((state) => {
      const currentState = JSON.parse(JSON.stringify(state));

      currentState.cartProducts.push({
        ...product,
        totalPrice: product.price,
        amount: 1,
      });

      return currentState;
    }),

  removeFromCart: (id) =>
    set((state) => {
      const currentState = JSON.parse(JSON.stringify(state));

      currentState.cartProducts = currentState.cartProducts.filter(
        (product) => product.id !== id
      );

      return currentState;
    }),

  addProductAmount: (id) =>
    set((state) => {
      const currentState = JSON.parse(JSON.stringify(state));

      currentState.cartProducts = currentState.cartProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              amount: product.amount + 1,
              totalPrice: product.price * (product.amount + 1),
            }
          : product
      );

      return currentState;
    }),

  minusProductAmount: (id) =>
    set((state) => {
      const currentState = JSON.parse(JSON.stringify(state));

      currentState.cartProducts = currentState.cartProducts.map((product) =>
        product.id === id && product.amount > 1
          ? {
              ...product,
              amount: product.amount - 1,
              totalPrice: product.price * (product.amount - 1),
            }
          : product
      );

      return currentState;
    }),

  removeProducts: () =>
    set((state) => {
      const currentState = JSON.parse(JSON.stringify(state));

      currentState.checkout = currentState.cartProducts 
      currentState.cartProducts = [];

      return currentState;
    }),

    revert: () =>
    set((state) => {
      const currentState = JSON.parse(JSON.stringify(state));
      
      currentState.cartProducts = currentState.checkout

      return currentState;
    }),
}));
