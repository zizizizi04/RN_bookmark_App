import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import BookmarkContext from "../components/BookmarksPrvider";

const BookmarkListScreen = ({ route }) => {
  const { bookmarks } = useContext(BookmarkContext);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {bookmarks.length > 0 ? (
        bookmarks.map((bookmark) => (
          <View key={bookmark.id} style={styles.listBox}>
            <Text>번호: {bookmark.id}</Text>
            <Text>작성날짜: {bookmark.regDate}</Text>
            <Text>내용: {bookmark.content}</Text>
          </View>
        ))
      ) : (
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          작성된 북마크가 없습니다.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listBox: {
    borderWidth: 2,
    width: "90%",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },
});

export default BookmarkListScreen;
