import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";

const FieldScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Campo</Text>
      <Text style={styles.subtitle}>Pantalla de ejemplo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.darkGray,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.darkGray,
  },
});

export default FieldScreen;
