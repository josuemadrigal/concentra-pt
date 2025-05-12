import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";
import { StatusBar } from "expo-status-bar";
import TopCurveBackground from "@/components/TopCurveBackground";
import layout from "@/constants/layout";

const GameListScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <Text style={styles.title}>Lista de Juegos</Text>
      <Text style={styles.subtitle}>Pantalla de ejemplo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    padding: layout.padding.medium,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.darkGray,
    marginBottom: layout.padding.medium,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.darkGray,
  },
});

export default GameListScreen;
