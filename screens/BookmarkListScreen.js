import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import BookmarkContext from "../components/BookmarksPrvider";
import { ListItem, Icon } from "@rneui/themed";

const BookmarkListScreen = ({ route }) => {
  const { bookmarks, removeBookmark, modifyBookmark } =
    useContext(BookmarkContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBookmarkId, setSelectedBookmarkId] = useState(null);
  const [modifiedContent, setModifiedContent] = useState("");

  const openModifyModal = (bookmark, reset) => {
    setSelectedBookmarkId(bookmark.id);
    setModifiedContent(bookmark.content);
    reset();
    setModalVisible(true);
  };

  const handlModifyModal = () => {
    if (selectedBookmarkId !== null) {
      modifyBookmark(selectedBookmarkId, modifiedContent);
    }

    setSelectedBookmarkId(null);
    setModalVisible(false);
  };

  const closeModal = () => {
    setModifiedContent(modifiedContent);
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
          <View
            key={bookmark.id}
            style={{
              marginVertical: 5, // margin Y축
              marginHorizontal: 10, // margin X축
              borderWidth: 2,
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <ListItem.Swipeable
              bottomDivider
              style={styles.listBox}
              leftContent={(reset) => (
                <Pressable
                  style={{ ...styles.pressableBtn, backgroundColor: "blue" }}
                  onPress={() => openModifyModal(bookmark, reset)}
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
        <Pressable onPress={closeModal} style={styles.modalContainer}>
          <Pressable style={styles.modalBox}>
            <View style={styles.modalInner}>
              <View style={{ flexGrow: 1 }}>
                <TextInput
                  multiline
                  style={styles.modifyInput}
                  placeholder="수정할 내용을 입력해주세요."
                  value={modifiedContent}
                  onChangeText={setModifiedContent}
                />
              </View>
              <View style={styles.modalBtnBox}>
                <TouchableOpacity onPress={handlModifyModal}>
                  <Text style={styles.modalBtnText}>수정</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeModal}>
                  <Text style={styles.modalBtnText}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listBox: {},
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
  modalInner: {
    flex: 1,
  },
  modalBox: {
    width: "80%",
    minHeight: 250,
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  modifyInput: {
    padding: 10,
    fontSize: 20,
  },
  modalBtnBox: {
    height: 60,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
    paddingRight: 20,
  },
  modalBtnText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BookmarkListScreen;
