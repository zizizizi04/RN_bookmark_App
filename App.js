import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
};

const BookmarkWriteScreen = ({ navigation, route }) => {
  const [bookmark, setBookmark] = useState("");

  return (
    <>
      <TextInput
        multiline
        onChangeText={setBookmark}
        value={bookmark}
        placeholder="북마크를 추가해 주세요."
        style={{
          flex: 0.3,
          padding: 10,
          backgroundColor: "#fff",
          borderRadius: 10,
          borderWidth: 2,
          margin: 10,
        }}
      />
      <Pressable
        onPress={() => {
          navigation.navigate("BookmarkList", { bookmark });
          setBookmark("");
        }}
      >
        <Text
          style={{
            padding: 10,
            backgroundColor: "#fff",
            borderRadius: 10,
            borderWidth: 2,
            margin: 10,
            width: "30%",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          작성
        </Text>
      </Pressable>
    </>
  );
};

const BookmarkListScreen = ({ route }) => {
  const { bookmark } = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>BookmarkWrite</Text>
      <Text>작성 내용 : {bookmark}</Text>
    </View>
  );
};

const MyPageScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>내정보</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabelStyle: {
            fontSize: 13,
            paddingBottom: 10,
            fontWeight: "bold",
          },
          tabBarInactiveTintColor: "#0162d1",
          tabBarActiveTintColor: "black",
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name == "Home") {
              iconName = "home";
            } else if (route.name == "BookmarkWrite") {
              iconName = "bookmark-add";
            } else if (route.name == "BookmarkList") {
              iconName = "format-list-bulleted";
            } else if (route.name == "MyPage") {
              iconName = "person";
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "메인 홈",
          }}
        />
        <Tab.Screen
          name="BookmarkWrite"
          component={BookmarkWriteScreen}
          options={{
            title: "북마크 작성",
          }}
        />
        <Tab.Screen
          name="BookmarkList"
          component={BookmarkListScreen}
          options={{
            title: "리스트",
          }}
        />
        <Tab.Screen
          name="MyPage"
          component={MyPageScreen}
          options={{
            title: "내 정보",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
