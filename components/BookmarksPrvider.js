import React, { useState, useRef, createContext } from "react";
import { dateToStr } from "../utils/util";

const BookmarkContext = createContext();

export const BookmarksPrvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const lastBookmarkIdRef = useRef(0);

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

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkContext;
