import { createSlice } from '@reduxjs/toolkit';

// Initial state of the cart
const initialState = {
  items: [], // Array to hold cart items
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add an item to the cart
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        // If item already exists, increase its quantity
        existingItem.quantity += 1;
      } else {
        // If item doesn't exist, add it with a quantity of 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    // Remove an item from the cart by its name
    removeItem: (state, action) => {
      const itemName = action.payload.name; // Extract item name from the payload
      state.items = state.items.filter(item => item.name !== itemName);
    },

    // Update the quantity of an item in the cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // Extract name and new quantity from payload
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        // If the item is found, update its quantity
        existingItem.quantity = quantity;

        // Optionally remove the item if quantity is set to 0
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.name !== name);
        }
      }
    },
  },
});

// Export the action creators
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

// Export the reducer as the default export to use in store.js
export default cartSlice.reducer;


