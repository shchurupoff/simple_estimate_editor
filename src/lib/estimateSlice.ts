// estimateSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Estimate, EstimateItem } from "../types";

const initialState: Estimate = {
  id: uuidv4(),
  items: [],
  totalSum: 0,
};

const calculateTotal = (items: EstimateItem[]): number => {
  return items.reduce((sum, item) => sum + item.totalPrice, 0);
};

export const estimateSlice = createSlice({
  name: "estimate",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<Omit<EstimateItem, "id" | "totalPrice">>
    ) => {
      const newItem: EstimateItem = {
        id: uuidv4(),
        ...action.payload,
        totalPrice: action.payload.quantity * action.payload.pricePerUnit,
      };
      state.items.push(newItem);
      state.totalSum = calculateTotal(state.items);
    },
    updateItem: (state, action: PayloadAction<EstimateItem>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = {
          ...action.payload,
          totalPrice: action.payload.quantity * action.payload.pricePerUnit,
        };
        state.totalSum = calculateTotal(state.items);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalSum = calculateTotal(state.items);
    },
    loadEstimate: (state, action: PayloadAction<Estimate>) => {
      return action.payload;
    },
  },
});

export const { addItem, updateItem, removeItem, loadEstimate } =
  estimateSlice.actions;
export default estimateSlice.reducer;
