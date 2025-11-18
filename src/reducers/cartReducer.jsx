export const cartReducer = (state, action) => {
  switch (action.type) {
    // -----------------------------------------
    // ADD ITEM – merge duplicates properly
    // -----------------------------------------
    case "ADD_ITEM": {
      const newItem = action.payload;

      // Check if item already exists (match id + variant keys)
      const existing = state.find(
        (i) =>
          i._id === newItem._id &&
          i.size === newItem.size &&
          i.color === newItem.color
      );

      // If item already exists → increase quantity
      if (existing) {
        return state.map((i) =>
          i._id === newItem._id &&
          i.size === newItem.size &&
          i.color === newItem.color
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        );
      }

      // Otherwise, add new item
      return [...state, newItem];
    }

    // -----------------------------------------
    // REMOVE ITEM
    // -----------------------------------------
    case "REMOVE_ITEM": {
      const item = action.payload;
      return state.filter(
        (i) =>
          !(
            i._id === item._id &&
            i.size === item.size &&
            i.color === item.color
          )
      );
    }

    // -----------------------------------------
    // UPDATE QUANTITY
    // -----------------------------------------
    case "UPDATE_QUANTITY": {
      const { item, quantity } = action.payload;

      return state.map((i) =>
        i._id === item._id && i.size === item.size && i.color === item.color
          ? { ...i, quantity }
          : i
      );
    }

    // -----------------------------------------
    // CLEAR CART
    // -----------------------------------------
    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};
