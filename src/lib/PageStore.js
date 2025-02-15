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

export const useOrdersStore = create((set) => ({
  orders: [
    {
      _id: "000001",
      status: "pending",
      date: "2025-01-21T12:09:00Z",
      seatNo: 12,
      name: "Customer",
      items: [
        { name: "Croissant", quantity: 4 },
        { name: "Pizza", quantity: 4 },
        { name: "Yoghurt", quantity: 4 },
        { name: "Chocolate", quantity: 4 },
        { name: "Boba", quantity: 4 },
      ],
      totalAmount: "30",
    },
    {
      _id: "000002",
      status: "in_progress",
      date: "2025-01-22T08:45:30Z",
      seatNo: 5,
      name: "Staff",
      items: [
        { name: "Burger", quantity: 2 },
        { name: "Fries", quantity: 1 },
        { name: "Milkshake", quantity: 1 },
      ],
      totalAmount: "25",
    },
    {
      _id: "000003",
      status: "ready",
      date: "2025-01-22T13:10:15Z",
      seatNo: 7,
      name: "Customer",
      items: [
        { name: "Pancakes", quantity: 3 },
        { name: "Syrup", quantity: 1 },
        { name: "Orange Juice", quantity: 2 },
      ],
      totalAmount: "40",
    },
    {
      _id: "000004",
      status: "completed",
      date: "2025-01-23T09:30:00Z",
      seatNo: 3,
      name: "Staff",
      items: [
        { name: "Grilled Chicken", quantity: 1 },
        { name: "Mashed Potatoes", quantity: 1 },
        { name: "Lemonade", quantity: 2 },
      ],
      totalAmount: "50",
    },
    {
      _id: "000005",
      status: "pending",
      date: "2025-01-23T14:20:45Z",
      seatNo: 8,
      name: "Customer",
      items: [
        { name: "Tacos", quantity: 3 },
        { name: "Guacamole", quantity: 1 },
        { name: "Iced Tea", quantity: 2 },
      ],
      totalAmount: "35",
    },
    {
      _id: "000006",
      status: "in_progress",
      date: "2025-01-24T10:10:05Z",
      seatNo: 2,
      name: "Staff",
      items: [
        { name: "Sushi", quantity: 5 },
        { name: "Miso Soup", quantity: 1 },
        { name: "Green Tea", quantity: 1 },
      ],
      totalAmount: "60",
    },
    {
      _id: "000007",
      status: "ready",
      date: "2025-01-24T17:45:40Z",
      seatNo: 6,
      name: "Customer",
      items: [
        { name: "Pasta", quantity: 2 },
        { name: "Garlic Bread", quantity: 1 },
        { name: "Wine", quantity: 2 },
      ],
      totalAmount: "55",
    },
    {
      _id: "000008",
      status: "completed",
      date: "2025-01-25T12:30:25Z",
      seatNo: 9,
      name: "Staff",
      items: [
        { name: "Steak", quantity: 1 },
        { name: "Salad", quantity: 1 },
        { name: "Red Wine", quantity: 2 },
      ],
      totalAmount: "75",
    },
  ],
}));
