import { StyleSheet, Text, View, Pressable, Alert, Modal } from "react-native";
import React, { useContext, useState } from "react";
import BookmarkContext from "../components/BookmarksPrvider";
import { ListItem, Icon } from "@rneui/themed";

const BookmarkListScreen = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { bookmarks, removeBookmark } = useContext(BookmarkContext);

  const openModifyModal = (reset) => {
    reset();
    setModalVisible(true);
  };

  const closeModifyModal = () => {
    setModalVisible(false);
  };

  const handleRemoveBookmark = (id, reset) => {
    Alert.alert(
      "삭제 확인",
      "정말 삭제하시겠습니까?",
      [
        {
          text: "삭제",
          onPress: () => {
            removeBookmark(id);
            reset();
          },
          style: "destructive",
        },
        { text: "취소", onPress: () => reset(), style: "cancel" },
      ],
      {
        cancelable: true, // 경고창 상자 밖을 클릭하면 경고창 닫힘
        onDismiss: () => reset(), // 경고창 상자 밖을 클릭한 경우 콜백 함수 실행
      }
    );
  };

  return (
    <View style={styles.listContainer}>
      {bookmarks.length > 0 ? (
        bookmarks.map((bookmark) => (
          <View key={bookmark.id}>
            <ListItem.Swipeable
              style={styles.listBox}
              leftContent={(reset) => (
                <Pressable
                  style={{ ...styles.pressableBtn, backgroundColor: "blue" }}
                  onPress={() => openModifyModal(reset)}
                >
                  <Icon name="update" color="white" />
                  <Text style={styles.btnText}>수정</Text>
                </Pressable>
              )}
              rightContent={(reset) => (
                <Pressable
                  style={{ ...styles.pressableBtn, backgroundColor: "red" }}
                  onPress={() => handleRemoveBookmark(bookmark.id, reset)}
                >
                  <Icon name="delete" color="white" />
                  <Text style={styles.btnText}>삭제</Text>
                </Pressable>
              )}
            >
              <ListItem.Content>
                <ListItem.Title>번호: {bookmark.id}</ListItem.Title>
                <ListItem.Subtitle>
                  작성날짜: {bookmark.regDate}
                </ListItem.Subtitle>
                <ListItem.Subtitle>내용: {bookmark.content}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem.Swipeable>
          </View>
        ))
      ) : (
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          작성된 북마크가 없습니다.
        </Text>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable onPress={closeModifyModal} style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={{ fontSize: 30 }}>수정창</Text>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: "#fff",
  },
  listBox: {
    borderWidth: 2,
    borderRadius: 20,
  },
  pressableBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalBox: {
    width: "80%",
    minHeight: 250,
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});

export default BookmarkListScreen;
