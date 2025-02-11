import { create } from "zustand";

export const useBranchStore = create((set) => ({
  branch: {
    branchName: "",
    location: "",
    status: "",
  },
  // branch: {
  //   itemName: "",
  //   category: "",
  //   foodType: "",
  //   description: "",
  //   price: "",
  //   branch: "",
  //   availability: "",
  // },

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
