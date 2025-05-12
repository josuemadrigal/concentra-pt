import { RootStackParamList } from "@/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/colors";
import { StatusBar } from "expo-status-bar";
import layout from "@/constants/layout";

type PlayersListScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Players">;
};
const HomeScreen: React.FC<PlayersListScreenProps> = ({ navigation }) => {
  const goToPlayers = () => {
    navigation.navigate("Players");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de inicio</Text>
      <Text style={styles.subtitle}>Pantalla de ejemplo</Text>
      <TouchableOpacity style={styles.button} onPress={goToPlayers}>
        <Text style={styles.buttonText}> Ir a Jugadores</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  button: {
    fontSize: 18,
    color: Colors.white,
    backgroundColor: Colors.primary,
    padding: layout.padding.medium,
    borderRadius: layout.borderRadius.medium,
    textAlign: "center",
    marginTop: layout.padding.medium,
  },
  buttonText: {
    fontSize: 18,
    color: Colors.white,
  },
});
