import React, { useState, useRef, createContext } from "react";
import testData from "./TestData";

const BookmarkContext = createContext();

export const BookmarksPrvider = ({ children }) => {
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

  const modifyBookmark = (id, newContent) => {
    const newBookmarks = bookmarks.map((bookmark) =>
      bookmark.id === id ? { ...bookmark, content: newContent } : bookmark
    );
    setBookmarks(newBookmarks);
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark, modifyBookmark }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkContext;
