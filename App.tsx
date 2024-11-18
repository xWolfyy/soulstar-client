import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";

export default () => {
  return (
    <View style={[styles.f1, { backgroundColor: "#000000" }]}>
      <Text style={styles.helloWorldTextStyle}>Hello World</Text>
    </View>
  );
};

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});