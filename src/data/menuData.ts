// export interface MenuItem {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
//   labels?: string[];
//   prepTime?: string;
//   dietary?: string[];
//   nutrition?: {
//     calories: number;
//     protein: number;
//     carbs: number;
//     fats: number;
//   };
// }

// export interface AppSettings {
//   name: string;
//   slogan: string;
//   logo: string;
//   whatsappNumber: string;
//   mpesaNumber: string;
//   location: string;
//   operatingHours: string;
// }









// export interface Category {
//   id: string;
//   name: string;
//   icon: string;
//   description?: string;
//   displayOrder: number;
//   isActive: boolean;
//   image?: string;
// }













// // Initialize default settings
// export const defaultSettings: AppSettings = {
//   name: "Mobile Kitchen",
//   slogan: "Fast Food & Catering",
//   logo: "🍽️",
//   whatsappNumber: "+254775269628",
//   mpesaNumber: "0792211741",
//   location: "Thindingua, opposite Quick Mart, Kiambu Road",
//   operatingHours: "Monday - Sunday: 10:00 AM - 9:00 PM"
// };

// // Default menu items
// export const defaultMenuItems: MenuItem[] = [
//   // Drinks
//   {
//     id: "drink-1",
//     name: "Classic Lemonade",
//     description: "Refreshing homemade lemonade with fresh lemons, perfectly balanced sweetness. A timeless thirst quencher.",
//     price: 130,
//     image: "https://images.unsplash.com/photo-1728777187102-1ed5cd6346d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwbGVtb25hZGUlMjBnbGFzc3xlbnwxfHx8fDE3NzA3NTY3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
//     category: "drinks",
//     labels: ["Fresh", "Popular"],
//     prepTime: "5 mins",
//     dietary: ["Vegan", "Gluten-Free"],
//     nutrition: {
//       calories: 120,
//       protein: 0,
//       carbs: 31,
//       fats: 0
//     }
//   },
//   {
//     id: "drink-2",
//     name: "Mint Lemonade",
//     description: "Cool and invigorating blend of fresh mint leaves and zesty lemons. Perfect for hot Nairobi days.",
//     price: 130,
//     image: "https://images.unsplash.com/photo-1593840844799-ad0334762081?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW50JTIwbGVtb25hZGUlMjBmcmVzaHxlbnwxfHx8fDE3NzA3NTY3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
//     category: "drinks",
//     labels: ["Fresh", "Refreshing"],
//     prepTime: "5 mins",
//     dietary: ["Vegan", "Gluten-Free"],
//     nutrition: {
//       calories: 125,
//       protein: 0,
//       carbs: 32,
//       fats: 0
//     }
//   },
//   {
//     id: "drink-3",
//     name: "Strawberry Lemonade",
//     description: "Sweet strawberries meet tangy lemons in this vibrant pink delight. Instagram-worthy and delicious!",
//     price: 160,
//     image: "https://images.unsplash.com/photo-1673646959767-1f87b64baf36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhd2JlcnJ5JTIwbGVtb25hZGUlMjBwaW5rfGVufDF8fHx8MTc3MDc1NjcxMnww&ixlib=rb-4.1.0&q=80&w=1080",
//     category: "drinks",
//     labels: ["Fresh", "Popular"],
//     prepTime: "7 mins",
//     dietary: ["Vegan", "Gluten-Free"],
//     nutrition: {
//       calories: 145,
//       protein: 1,
//       carbs: 36,
//       fats: 0
//     }
//   },
//   {
//     id: "drink-4",
//     name: "Passion Fruit Mojito",
//     description: "Exotic passion fruit blended with fresh mint, lime and a splash of soda. Non-alcoholic tropical paradise!",
//     price: 250,
//     image: "https://images.unsplash.com/photo-1606758037375-a2a76453407a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXNzaW9uJTIwZnJ1aXQlMjBtb2ppdG8lMjBjb2NrdGFpbHxlbnwxfHx8fDE3NzA3NTY3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
//     category: "drinks",
//     labels: ["Premium", "Tropical"],
//     prepTime: "8 mins",
//     dietary: ["Vegan", "Gluten-Free"],
//     nutrition: {
//       calories: 180,
//       protein: 2,
//       carbs: 44,
//       fats: 0
//     }
//   },
//   // Food
//   {
//     id: "food-1",
//     name: "Chicken Wrap",
//     description: "Tender grilled chicken, crisp lettuce, juicy tomatoes, and our signature sauce wrapped in a soft tortilla. Satisfaction guaranteed!",
//     price: 200,
//     image: "https://images.unsplash.com/photo-1756137949459-8aad8455d040?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwd3JhcCUyMHRvcnRpbGxhfGVufDF8fHx8MTc3MDcxODQ2OHww&ixlib=rb-4.1.0&q=80&w=1080",
//     category: "food",
//     labels: ["Popular", "Halal"],
//     prepTime: "10-12 mins",
//     dietary: ["Halal", "High Protein"],
//     nutrition: {
//       calories: 420,
//       protein: 28,
//       carbs: 45,
//       fats: 14
//     }
//   },
//   {
//     id: "food-2",
//     name: "Chicken Half",
//     description: "Perfectly seasoned half chicken, grilled to golden perfection. Juicy, tender, and bursting with flavor. A feast for one!",
//     price: 500,
//     image: "https://images.unsplash.com/photo-1652545296882-cf7f118c4df5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMGhhbGZ8ZW58MXx8fHwxNzcwNzU2NzEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
//     category: "food",
//     labels: ["Halal", "Grilled"],
//     prepTime: "25-30 mins",
//     dietary: ["Halal", "High Protein", "Low Carb"],
//     nutrition: {
//       calories: 650,
//       protein: 65,
//       carbs: 0,
//       fats: 42
//     }
//   },
//   {
//     id: "food-3",
//     name: "Chicken Quarter",
//     description: "Quarter chicken grilled to perfection with our special blend of spices. Perfect portion for a quick meal.",
//     price: 250,
//     image: "https://images.unsplash.com/photo-1652545296882-cf7f118c4df5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMGhhbGZ8ZW58MXx8fHwxNzcwNzU2NzEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
//     category: "food",
//     labels: ["Halal"],
//     prepTime: "15-20 mins",
//     dietary: ["Halal", "High Protein", "Low Carb"],
//     nutrition: {
//       calories: 325,
//       protein: 32,
//       carbs: 0,
//       fats: 21
//     }
//   },
//   {
//     id: "food-4",
//     name: "Chips/Fries",
//     description: "Golden crispy fries, perfectly salted. Simple, classic, and irresistibly delicious. The ultimate comfort food.",
//     price: 150,
//     image: "https://images.unsplash.com/photo-1546528356-f4762f77b2f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllcyUyMGNoaXBzfGVufDF8fHx8MTc3MDc1NjcxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
//     category: "food",
//     labels: ["Popular", "Vegetarian"],
//     prepTime: "8-10 mins",
//     dietary: ["Vegetarian", "Vegan"],
//     nutrition: {
//       calories: 365,
//       protein: 4,
//       carbs: 48,
//       fats: 17
//     }
//   }
// ];








// // Default categories
// export const defaultCategories: Category[] = [
//   {
//     id: 'all',
//     name: 'All Items',
//     icon: '🍽️',
//     description: 'Browse our complete menu',
//     displayOrder: 0,
//     isActive: true
//   },
//   {
//     id: 'popular',
//     name: 'Popular',
//     icon: '🔥',
//     description: 'Customer favorites',
//     displayOrder: 1,
//     isActive: true
//   },
//   {
//     id: 'food',
//     name: 'Food',
//     icon: '🍗',
//     description: 'Delicious meals',
//     displayOrder: 2,
//     isActive: true
//   },
//   {
//     id: 'drinks',
//     name: 'Drinks',
//     icon: '🥤',
//     description: 'Refreshing beverages',
//     displayOrder: 3,
//     isActive: true
//   }
// ];












// // Gallery images
// export const galleryImages = [
//   "https://images.unsplash.com/photo-1768725847223-8407142e653a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRlcmluZyUyMGJ1ZmZldCUyMGZvb2R8ZW58MXx8fHwxNzcwNDU2ODM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
//   "https://images.unsplash.com/photo-1760888548893-bc2f7e09e972?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwc2hhd2FybWElMjB3cmFwfGVufDF8fHx8MTc3MDUyOTc2MHww&ixlib=rb-4.1.0&q=80&w=1080",
//   "https://images.unsplash.com/photo-1672856399624-61b47d70d339?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwd2luZ3MlMjBjcmlzcHl8ZW58MXx8fHwxNzcwNDg5MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
// ];



export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  labels?: string[];
  prepTime?: string;
  dietary?: string[];
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}

export interface AppSettings {
  name: string;
  slogan: string;
  logo: string;
  whatsappNumber: string;
  mpesaNumber: string;
  location: string;
  operatingHours: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
  displayOrder: number;
  isActive: boolean;
}

// Initialize default settings
export const defaultSettings: AppSettings = {
  name: "Mobile Kitchen",
  slogan: "Fast Food & Catering",
  logo: "🍽️",
  whatsappNumber: "+254775269628",
  mpesaNumber: "0792211741",
  location: "Thindingua, opposite Quick Mart, Kiambu Road",
  operatingHours: "Monday - Sunday: 10:00 AM - 9:00 PM"
};

// Default categories
export const defaultCategories: Category[] = [
  {
    id: 'all',
    name: 'All Items',
    icon: '🍽️',
    description: 'Browse our complete menu',
    displayOrder: 0,
    isActive: true
  },
  {
    id: 'popular',
    name: 'Popular',
    icon: '🔥',
    description: 'Customer favorites',
    displayOrder: 1,
    isActive: true
  },
  {
    id: 'food',
    name: 'Food',
    icon: '🍗',
    description: 'Delicious meals',
    displayOrder: 2,
    isActive: true
  },
  {
    id: 'drinks',
    name: 'Drinks',
    icon: '🥤',
    description: 'Refreshing beverages',
    displayOrder: 3,
    isActive: true
  }
];

// Default menu items
export const defaultMenuItems: MenuItem[] = [
  // Drinks
  {
    id: "drink-1",
    name: "Classic Lemonade",
    description: "Refreshing homemade lemonade with fresh lemons, perfectly balanced sweetness. A timeless thirst quencher.",
    price: 130,
    image: "https://images.unsplash.com/photo-1728777187102-1ed5cd6346d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwbGVtb25hZGUlMjBnbGFzc3xlbnwxfHx8fDE3NzA3NTY3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "drinks",
    labels: ["Fresh", "Popular"],
    prepTime: "5 mins",
    dietary: ["Vegan", "Gluten-Free"],
    nutrition: {
      calories: 120,
      protein: 0,
      carbs: 31,
      fats: 0
    }
  },
  {
    id: "drink-2",
    name: "Mint Lemonade",
    description: "Cool and invigorating blend of fresh mint leaves and zesty lemons. Perfect for hot Nairobi days.",
    price: 130,
    image: "https://images.unsplash.com/photo-1593840844799-ad0334762081?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW50JTIwbGVtb25hZGUlMjBmcmVzaHxlbnwxfHx8fDE3NzA3NTY3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "drinks",
    labels: ["Fresh", "Refreshing"],
    prepTime: "5 mins",
    dietary: ["Vegan", "Gluten-Free"],
    nutrition: {
      calories: 125,
      protein: 0,
      carbs: 32,
      fats: 0
    }
  },
  {
    id: "drink-3",
    name: "Strawberry Lemonade",
    description: "Sweet strawberries meet tangy lemons in this vibrant pink delight. Instagram-worthy and delicious!",
    price: 160,
    image: "https://images.unsplash.com/photo-1673646959767-1f87b64baf36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhd2JlcnJ5JTIwbGVtb25hZGUlMjBwaW5rfGVufDF8fHx8MTc3MDc1NjcxMnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "drinks",
    labels: ["Fresh", "Popular"],
    prepTime: "7 mins",
    dietary: ["Vegan", "Gluten-Free"],
    nutrition: {
      calories: 145,
      protein: 1,
      carbs: 36,
      fats: 0
    }
  },
  {
    id: "drink-4",
    name: "Passion Fruit Mojito",
    description: "Exotic passion fruit blended with fresh mint, lime and a splash of soda. Non-alcoholic tropical paradise!",
    price: 250,
    image: "https://images.unsplash.com/photo-1606758037375-a2a76453407a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXNzaW9uJTIwZnJ1aXQlMjBtb2ppdG8lMjBjb2NrdGFpbHxlbnwxfHx8fDE3NzA3NTY3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "drinks",
    labels: ["Premium", "Tropical"],
    prepTime: "8 mins",
    dietary: ["Vegan", "Gluten-Free"],
    nutrition: {
      calories: 180,
      protein: 2,
      carbs: 44,
      fats: 0
    }
  },
  // Food
  {
    id: "food-1",
    name: "Chicken Wrap",
    description: "Tender grilled chicken, crisp lettuce, juicy tomatoes, and our signature sauce wrapped in a soft tortilla. Satisfaction guaranteed!",
    price: 200,
    image: "https://images.unsplash.com/photo-1756137949459-8aad8455d040?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwd3JhcCUyMHRvcnRpbGxhfGVufDF8fHx8MTc3MDcxODQ2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "food",
    labels: ["Popular", "Halal"],
    prepTime: "10-12 mins",
    dietary: ["Halal", "High Protein"],
    nutrition: {
      calories: 420,
      protein: 28,
      carbs: 45,
      fats: 14
    }
  },
  {
    id: "food-2",
    name: "Chicken Half",
    description: "Perfectly seasoned half chicken, grilled to golden perfection. Juicy, tender, and bursting with flavor. A feast for one!",
    price: 500,
    image: "https://images.unsplash.com/photo-1652545296882-cf7f118c4df5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMGhhbGZ8ZW58MXx8fHwxNzcwNzU2NzEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "food",
    labels: ["Halal", "Grilled"],
    prepTime: "25-30 mins",
    dietary: ["Halal", "High Protein", "Low Carb"],
    nutrition: {
      calories: 650,
      protein: 65,
      carbs: 0,
      fats: 42
    }
  },
  {
    id: "food-3",
    name: "Chicken Quarter",
    description: "Quarter chicken grilled to perfection with our special blend of spices. Perfect portion for a quick meal.",
    price: 250,
    image: "https://images.unsplash.com/photo-1652545296882-cf7f118c4df5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMGhhbGZ8ZW58MXx8fHwxNzcwNzU2NzEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "food",
    labels: ["Halal"],
    prepTime: "15-20 mins",
    dietary: ["Halal", "High Protein", "Low Carb"],
    nutrition: {
      calories: 325,
      protein: 32,
      carbs: 0,
      fats: 21
    }
  },
  {
    id: "food-4",
    name: "Chips/Fries",
    description: "Golden crispy fries, perfectly salted. Simple, classic, and irresistibly delicious. The ultimate comfort food.",
    price: 150,
    image: "https://images.unsplash.com/photo-1546528356-f4762f77b2f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllcyUyMGNoaXBzfGVufDF8fHx8MTc3MDc1NjcxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "food",
    labels: ["Popular", "Vegetarian"],
    prepTime: "8-10 mins",
    dietary: ["Vegetarian", "Vegan"],
    nutrition: {
      calories: 365,
      protein: 4,
      carbs: 48,
      fats: 17
    }
  }
];

// Gallery images
export const galleryImages = [
  "https://images.unsplash.com/photo-1768725847223-8407142e653a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRlcmluZyUyMGJ1ZmZldCUyMGZvb2R8ZW58MXx8fHwxNzcwNDU2ODM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1760888548893-bc2f7e09e972?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwc2hhd2FybWElMjB3cmFwfGVufDF8fHx8MTc3MDUyOTc2MHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1672856399624-61b47d70d339?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwd2luZ3MlMjBjcmlzcHl8ZW58MXx8fHwxNzcwNDg5MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
];