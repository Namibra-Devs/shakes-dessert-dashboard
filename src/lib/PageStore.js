import { create } from "zustand";

export const useBranchStore = create((set) => ({
  branch: {
    branchName: "",
    location: "",
    status: "",
  },

  updateField: (value, field) => {
    set((state) => ({
      branch: {
        ...state.branch,
        [field]: value.toLowerCase() === "clear" ? "" : value,
      },
    }));
  },

  clearBranch: () => {
    set(() => ({
      branch: {
        branchName: "",
        location: "",
        status: "",
      },
    }));
  },
}));

export const useStockStore = create((set) => ({
  stock: {
    itemName: "",
    category: "",
    foodType: "",
    description: "",
    price: "",
    branch: "",
    availability: "",
    image: null,
  },

  updateField: (value, field) => {
    set((state) => ({
      stock: {
        ...state.stock,
        [field]: value.toLowerCase() === "clear" ? "" : value,
      },
    }));
  },

  setStockImage: (file) => {
    set((state) => ({
      stock: {
        ...state.stock,
        image: file,
      },
    }));
  },

  clearStock: () => {
    set(() => ({
      stock: {
        itemName: "",
        category: "",
        foodType: "",
        description: "",
        price: "",
        branch: "",
        availability: "",
        image: null,
      },
    }));
  },
}));

export const useUserStore = create((set) => ({
  user: {
    staffName: "",
    email: "",
    password: "",
    branch: "",
  },

  updateField: (value, field) => {
    set((state) => ({
      user: {
        ...state.user,
        [field]: value.toLowerCase() === "clear" ? "" : value,
      },
    }));
  },

  clearUser: () => {
    set(() => ({
      user: {
        staffName: "",
        email: "",
        password: "",
        branch: "",
      },
    }));
  },
}));
