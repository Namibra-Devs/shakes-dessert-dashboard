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
  stocks: [
    {
      _id: "2860492856",
      itemName: "Pizza",
      createdBy: "Admin",
      category: "most popular",
      foodType: "snack",
      price: 30,
      branch: "Accra",
      availability: "In Stock",
      description: "This is a Pizza",
      createdAt: "2025-02-16T10:00:00Z",
    },
    {
      _id: "9340912864",
      itemName: "Cake",
      createdBy: "Jawad",
      category: "Trending",
      foodType: "snack",
      price: 50,
      branch: "Tamale",
      availability: "Out Of Stock",
      description: "This is a Cake",
      createdAt: "2025-02-15T14:30:00Z",
    },
    {
      _id: "9340911297",
      itemName: "Gogo Apple",
      createdBy: "Kaisen",
      category: "Top Choice",
      foodType: "drink",
      price: 15,
      branch: "Tamale",
      availability: "In Stock",
      description: "This is a Gogo Apple drink",
      createdAt: "2025-02-14T09:15:00Z",
    },
  ],

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
  ],

  orderData: {
    seatNumber: "",
    paymentMethod: "",
    items: [
      // {
      //   _id: "001",
      //   name: "Item 1",
      //   price: 30,
      //   quantity: 5,
      // },
    ],
  },

  clearOrder: () => {
    set(() => ({
      orderData: {
        seatNumber: "",
        paymentMethod: "",
        items: [],
      },
    }));
  },

  updateField: (value, field) => {
    set((state) => ({
      orderData: {
        ...state.orderData,
        [field]: value.toLowerCase() === "clear" ? "" : value,
      },
    }));
  },

  setPaymentMethod: (method) => {
    set((state) => ({
      orderData: {
        ...state.orderData,
        paymentMethod: method.toLowerCase() === "clear" ? "" : method,
      },
    }));
  },

  addOrderItem: (newId) => {
    set((state) => ({
      orderData: {
        ...state.orderData,
        items: [
          ...(state.orderData.items || []),
          {
            _id: newId,
            name: "",
            price: 0,
            quantity: 1,
          },
        ],
      },
    }));
  },

  removeOrderItems: () => {
    set((state) => ({
      orderData: {
        ...state.orderData,
        items: [],
      },
    }));
  },

  deleteOrderItem: (itemId) => {
    set((state) => ({
      orderData: {
        ...state.orderData,
        items: state.orderData.items.filter((item) => item._id !== itemId),
      },
    }));
  },

  increaseItemQuantity: (id) => {
    set((state) => ({
      orderData: {
        ...state.orderData,
        items: state.orderData.items.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      },
    }));
  },

  decreaseItemQuantity: (id) => {
    set((state) => ({
      orderData: {
        ...state.orderData,
        items: state.orderData.items
          .map((item) =>
            item._id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0),
      },
    }));
  },

  setOrderItem: (id, itemObj) => {
    set((state) => ({
      orderData: {
        ...state.orderData,
        items: state.orderData.items.map((item) =>
          item._id === id ? { ...item, name: itemObj } : item
        ),
      },
    }));
  },

  setOrderItemPrice: (id, price) => {
    set((state) => ({
      orderData: {
        ...state.orderData,
        items: state.orderData.items.map((item) =>
          item._id === id ? { ...item, price } : item
        ),
      },
    }));
  },
}));
