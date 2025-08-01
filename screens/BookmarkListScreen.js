import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import BookmarkContext from "../components/BookmarksPrvider";
import { ListItem, Icon } from "@rneui/themed";

const { width, height } = Dimensions.get("window");

const BookmarkListItem = ({ bookmark, onModify, onRemove }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View
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
            onPress={() => onModify(bookmark, reset)}
          >
            <Icon name="update" color="white" />
            <Text style={styles.btnText}>수정</Text>
          </Pressable>
        )}
        rightContent={(reset) => (
          <Pressable
            style={{ ...styles.pressableBtn, backgroundColor: "red" }}
            onPress={() => onRemove(bookmark.id, reset)}
          >
            <Icon name="delete" color="white" />
            <Text style={styles.btnText}>삭제</Text>
          </Pressable>
        )}
      >
        <ListItem.Content>
          <ListItem.Title>번호: {bookmark.id}</ListItem.Title>
          <Text>작성날짜: {bookmark.regDate}</Text>
          <Pressable onPress={toggleExpand} style={styles.contentBox}>
            <Text numberOfLines={isExpanded ? null : 2} ellipsizeMode="tail">
              내용: {bookmark.content}
            </Text>
          </Pressable>
        </ListItem.Content>
      </ListItem.Swipeable>
    </View>
  );
};

const BookmarkModifyModal = ({
  modalVisible,
  setModalVisible,
  modifiedContent,
  setModifiedContent,
  onModify,
  closeModal,
}) => {
  return (
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
          <ScrollView style={styles.modalInner}>
            <TextInput
              multiline
              maxLength={100}
              style={styles.modifyInput}
              placeholder="수정할 내용을 입력해주세요."
              value={modifiedContent}
              onChangeText={setModifiedContent}
            />
          </ScrollView>
          <View style={styles.modalBtnBox}>
            <TouchableOpacity onPress={onModify}>
              <Text style={styles.modalBtnText}>수정</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.modalBtnText}>취소</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const BookmarkListScreen = () => {
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
        <FlatList
          data={bookmarks}
          renderItem={({ item }) => (
            <BookmarkListItem
              bookmark={item}
              onModify={openModifyModal}
              onRemove={handleRemoveBookmark}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          작성된 북마크가 없습니다.
        </Text>
      )}
      <BookmarkModifyModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modifiedContent={modifiedContent}
        setModifiedContent={setModifiedContent}
        onModify={handlModifyModal}
        closeModal={closeModal}
      />
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
  modalBox: {
    flex: 0.4,
    width: width * 0.8,
    backgroundColor: "#fff",
    borderWidth: 3,
    borderRadius: 10,
  },
  modifyInput: {
    padding: 10,
    fontSize: 20,
  },
  modalBtnBox: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 20,
    paddingRight: 20,
  },
  modalBtnText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BookmarkListScreen;
