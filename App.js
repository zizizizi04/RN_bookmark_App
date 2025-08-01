import { StyleSheet, Text, StatusBar, View, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import tabConfig from "./configs/tabConfig";
import { BookmarksPrvider } from "./components/BookmarksPrvider";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const CustomHeader = ({ title }) => {
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.headerBox}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const Tab = createBottomTabNavigator();

export default function App() {
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      const routeConfig = tabConfig.find(
        (config) => config.name === route.name
      );

      const iconName = focused
        ? routeConfig.focusedIcon
        : routeConfig.unfocusedIcon;
      const IconComponent = routeConfig.iconComponent;

      return <IconComponent name={iconName} size={size} color={color} />;
    },
    headerTitleAlign: "center",
    headerTitleStyle: {
      fontSize: 23,
      fontWeight: "bold",
    },
    tabBarLabelStyle: {
      fontSize: 13,
      paddingBottom: 10,
      fontWeight: "bold",
    },
    tabBarStyle: {
      height: "8%",
    },
    tabBarInactiveTintColor: "#0162d1",
    tabBarActiveTintColor: "black",
  });

  return (
    <BookmarksPrvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={screenOptions}>
          {tabConfig.map((routeConfig) => (
            <Tab.Screen
              key={routeConfig.name}
              name={routeConfig.name}
              component={routeConfig.component}
              options={{
                title: routeConfig.title,
                header: () => <CustomHeader title={routeConfig.title} />,
              }}
            />
          ))}
        </Tab.Navigator>
      </NavigationContainer>
    </BookmarksPrvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerBox: {
    height: height * 0.05,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginRight: 15,
  },
});
