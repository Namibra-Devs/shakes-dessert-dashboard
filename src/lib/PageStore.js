import { create } from "zustand";

export const useBranchStore = create((set) => ({
  branch: {
    itemName: "",
    category: "",
    foodType: "",
    description: "",
    price: "",
    branch: "",
    availability: "",
  },

  updateField: (value, field) => {
    set((state) => ({
      branch: {
        ...state.branch,
        [field]: value.toLowerCase() === "clear" ? "" : value,
      },
    }));
  },

  clearFields: () => {
    set(() => ({
      branch: {
        itemName: "",
        category: "",
        foodType: "",
        description: "",
        price: "",
        branch: "",
        availability: "",
      },
    }));
  },
}));
