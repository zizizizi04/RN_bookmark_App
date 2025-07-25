import React, { useState, useRef, createContext } from "react";
import { dateToStr } from "../utils/util";

const BookmarkContext = createContext();

export const BookmarksPrvider = ({ children }) => {
  const testData = [
    {
      id: 1,
      content: "테니스 치기",
      regDate: dateToStr(new Date()),
    },
    {
      id: 2,
      content: "리액트 네이티브 공부하기",
      regDate: dateToStr(new Date()),
    },
    {
      id: 3,
      content: "북마크 앱 구현하기",
      regDate: dateToStr(new Date()),
    },
  ];

  // const [bookmarks, setBookmarks] = useState([]);
  // const lastBookmarkIdRef = useRef(0);

  const [bookmarks, setBookmarks] = useState([...testData]);
  const lastBookmarkIdRef = useRef(testData.length);

  const addBookmark = (newContent) => {
    const id = ++lastBookmarkIdRef.current;
    const newBookmark = {
      id,
      content: newContent,
      regDate: dateToStr(new Date()),
    };

    const newBookmarks = [...bookmarks, newBookmark];
    setBookmarks(newBookmarks);
  };

  const removeBookmark = (id) => {
    const newBookmark = bookmarks.filter((bookmark) => bookmark.id != id);
    setBookmarks(newBookmark);
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkContext;
