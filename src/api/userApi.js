// Mock API functions to simulate fetching data from a backend
export const fetchUserData = async (userId) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    id: userId,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    memberSince: "January 2023",
    avatar: "https://via.placeholder.com/120",
  };
};

export const fetchCartItems = async (userId) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    {
      id: 1,
      title: "The Midnight Chronicles",
      type: "Premium Story",
      price: 12.99,
      image: "https://via.placeholder.com/80",
      duration: "45 min",
    },
    {
      id: 2,
      title: "Whispers of the Past",
      type: "Interactive Tale",
      price: 8.99,
      image: "https://via.placeholder.com/80",
      duration: "30 min",
    },
  ];
};

export const fetchBookings = async (userId) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    {
      id: 1,
      title: "The Enchanted Forest",
      type: "Live Experience",
      date: "June 15, 2025",
      time: "7:00 PM",
      status: "Confirmed",
      price: 25.0,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      title: "Mystery at the Manor",
      type: "Interactive Session",
      date: "June 22, 2025",
      time: "8:30 PM",
      status: "Pending",
      price: 18.5,
      image: "https://via.placeholder.com/80",
    },
  ];
};

export const fetchPurchaseHistory = async (userId) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    {
      id: 1,
      title: "Tales of Wonder Collection",
      date: "May 28, 2025",
      price: 34.99,
      status: "Completed",
    },
    {
      id: 2,
      title: "The Dragon's Quest",
      date: "May 15, 2025",
      price: 15.99,
      status: "Completed",
    },
  ];
};
