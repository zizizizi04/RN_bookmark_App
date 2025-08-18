import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  Dimensions,
} from "react-native";
import React, { useContext, useState } from "react";
import BookmarkContext from "../components/BookmarksProvider";
import AppLoadingContext from "../components/AppLoadingProvider";

const { width, height } = Dimensions.get("window");

const BookmarkWriteScreen = ({ navigation }) => {
  const [bookmark, setBookmark] = useState("");

  const { addBookmark } = useContext(BookmarkContext);
  const { fontsLoaded } = useContext(AppLoadingContext);

  const handleAddBookmark = () => {
    if (!bookmark.trim()) {
      Alert.alert("내용을 입력해주세요.");
      return;
    }

    addBookmark(bookmark);
    navigation.navigate("BookmarkList", { bookmark });
    setBookmark("");
  };

  return (
    <>
      <View style={styles.inputBox}>
        <TextInput
          multiline
          onChangeText={setBookmark}
          value={bookmark}
          placeholder="북마크를 추가해 주세요."
          style={styles.textInput}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          justifyContent: "center",
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <Pressable style={styles.pressableBtn} onPress={handleAddBookmark}>
          <Text style={styles.text}>작성</Text>
        </Pressable>
        <Pressable
          style={styles.pressableBtn}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.text}>취소</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    minHeight: height * 0.25,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    margin: 10,
  },
  textInput: {
    fontSize: 20,
    fontFamily: "pretendard-font",
    //fontWeight: "bold",
  },
  pressableBtn: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "pretendard-font",
  },
});

export default BookmarkWriteScreen;
