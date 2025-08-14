import React, { createContext, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

const AppLoadingContext = createContext();

const fetchFonts = () => {
  return Font.loadAsync({
    "pretendard-font": require("../assets/fonts/Pretendard-Medium.ttf"),
  });
};

export const AppLoadingProvider = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await fetchFonts();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e); // 폰트 로드 중 오류 발생 시 경고
      } finally {
        setFontsLoaded(true);
        await SplashScreen.hideAsync(); // 폰트 로드가 완료되면 스플래시 스크린을 숨겨 줌
      }
    };

    // 스플래시 스크린이 자동으로 숨겨지지 않도록 설정
    SplashScreen.preventAutoHideAsync();

    loadFonts();
  }, []);

  return (
    <AppLoadingContext.Provider value={{ fontsLoaded }}>
      {children}
    </AppLoadingContext.Provider>
  );
};

export default AppLoadingContext;
