import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import AddMenuScreen from "./screens/AddMenuScreen";
import ViewMenuScreen from "./screens/ViewMenuScreen";
import SplashScreen from "./screens/SplashScreen";

// Define types for our application
export type CourseType = "Starter" | "Main Course" | "Dessert";
export type Dish = {
  id: string;
  name: string;
  description: string;
  course: CourseType;
  price: number;
  imageSource?: any; // For local require() images
  imageUri?: string; // For gallery images
};

export type RootTabParamList = {
  Home: undefined;
  AddDish: undefined;
  ViewMenu: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

// Custom tab icon component for consistent styling
const CustomTabIcon = ({ icon, focused }: { icon: string; focused: boolean }) => (
  <View style={[styles.tabIcon, focused && styles.tabIconFocused]}>
    <Text style={[styles.tabIconText, focused && styles.tabIconTextFocused]}>
      {icon}
    </Text>
  </View>
);

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  
  // Initial dishes with hardcoded images
  const [dishes, setDishes] = useState<Dish[]>([
    {
      id: "1",
      name: "Salad",
      description: "Fresh lettuce with croutons and dressing",
      course: "Starter",
      price: 85,
      imageSource: require("./assets/salad.jpg"), // Hardcoded local image
    },
    {
      id: "2",
      name: "Salmon",
      description: "Fresh salmon with herbs and lemon",
      course: "Main Course",
      price: 120,
      imageSource: require("./assets/salmon.jpg"), // Hardcoded local image
    },
    {
      id: "3",
      name: "Chocolate Cake",
      description: "Rich chocolate dessert with berries",
      course: "Dessert",
      price: 65,
      imageSource: require("./assets/chocolate_cake.jpg"), // Hardcoded local image
    },
    {
      id: "4",
      name: "Beef Steak",
      description: "Premium beef with roasted vegetables",
      course: "Main Course",
      price: 150,
      imageSource: require("./assets/beef_steak.jpg"), // Hardcoded local image
    },
  ]);

  // Function to add a new dish to the menu
  const addDish = (newDish: Dish) => {
    setDishes((prev) => [...prev, newDish]);
  };

  // Function to delete a dish
  const deleteDish = (dishId: string) => {
    setDishes((prev) => prev.filter(dish => dish.id !== dishId));
  };

  // Show splash screen on app start
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabLabel,
        }}
      >
        <Tab.Screen
          name="Home"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) => (
              <CustomTabIcon icon="🏠" focused={focused} />
            ),
          }}
        >
          {() => <HomeScreen dishes={dishes} onDeleteDish={deleteDish} />}
        </Tab.Screen>

        <Tab.Screen
          name="AddDish"
          options={{
            tabBarLabel: "Add Dish",
          }}
        >
          {() => <AddMenuScreen dishes={dishes} onAddDish={addDish} />}
        </Tab.Screen>

        <Tab.Screen
          name="ViewMenu"
          options={{
            tabBarLabel: "Menu",
            tabBarIcon: ({ focused }) => (
              <CustomTabIcon icon="📋" focused={focused} />
            ),
          }}
        >
          {() => <ViewMenuScreen dishes={dishes} onDeleteDish={deleteDish} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#2c3e50",
    paddingBottom: 8,
    paddingTop: 8,
    height: 60,
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ecf0f1",
  },
  tabIcon: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  tabIconFocused: {
    backgroundColor: "#3498db",
  },
  tabIconText: {
    fontSize: 20,
    color: "#bdc3c7",
  },
  tabIconTextFocused: {
    color: "white",
  },
});

export default App;
