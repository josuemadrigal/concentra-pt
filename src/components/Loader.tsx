import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Colors from "../constants/colors";

const Loader: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.gray,
  },
});

export default Loader;
