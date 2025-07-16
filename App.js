import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
          //navigation.navigate("BookmarkListScreen", { bookmark });
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

const BookmarkListScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>BookmarkWrite</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="BookmarkWrite" component={BookmarkWriteScreen} />
        <Tab.Screen name="BookmarkList" component={BookmarkListScreen} />
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
