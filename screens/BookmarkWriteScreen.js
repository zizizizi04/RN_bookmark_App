import { StyleSheet, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";

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

export default BookmarkWriteScreen;
