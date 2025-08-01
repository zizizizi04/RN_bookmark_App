import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React, { useState } from "react";

const backgroundImage = require("../assets/images/bookmarkBgImg.png");

const HomeScreen = () => {
  return (
    <ImageBackground source={backgroundImage} style={styles.bgImage}>
      <View style={styles.container}></View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
});

export default HomeScreen;
