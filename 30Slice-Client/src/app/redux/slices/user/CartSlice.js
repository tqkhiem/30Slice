import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    address: "",
    payment: "",
    name: "",
    phone: "",
    email: "",
    amount: 0,
    note: "",
    id_Customer: "",
  },
  reducers: {
    addProduct(state, action) {
      const product = action.payload;
      const index = state.products.findIndex(
        (item) => item._id === product._id
      );
      if (index === -1) {
        state.products.push(product);
      } else {
        state.products[index].Quantity += 1;
      }
      // set amount
      state.amount = state.products.reduce(
        (total, item) => total + item.Quantity * item.Price,
        0
      );
    },
    removeProduct(state, action) {
      const id = action.payload;
      const index = state.products.findIndex((item) => item._id === id);
      if (index !== -1) {
        state.products.splice(index, 1);
      }
      // set amount
      state.amount = state.products.reduce(
        (total, item) => total + item.Quantity * item.Price,
        0
      );
    },
    updateProduct(state, action) {
      const product = action.payload;
      const index = state.products.findIndex(
        (item) => item._id === product._id
      );
      if (index !== -1) {
        state.products[index].Quantity = product.Quantity;
      }
      // set amount
      state.amount = state.products.reduce(
        (total, item) => total + item.Quantity * item.Price,
        0
      );
    },
    setInfo(state, action) {
      const info = action.payload;
      state.address = info.address;
      state.name = info.name;
      state.phone = info.phone;
      state.email = info.email;
      state.note = info.note;
      state.id_Customer = info.id_Customer;
    },
    setPayment(state, action) {
      state.payment = action.payload;
    },
    clearCart(state) {
      state.products = [];
      state.address = "";
      state.payment = "";
      state.name = "";
      state.phone = "";
      state.email = "";
      state.amount = 0;
      state.note = "";
      state.id_Customer = "";
    }
  },
});

const { actions, reducer } = CartSlice;
export const { addProduct, removeProduct, updateProduct, setInfo, setPayment, clearCart } = actions;
export default reducer;
