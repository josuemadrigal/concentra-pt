import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import PlayerDetailScreen from "../screens/Players/components/PlayerDetailScreen";
import { Player } from "../types";
import Colors from "../constants/colors";
import { StyleSheet } from "react-native";
import BackButton from "@/components/BackButton";

export type RootStackParamList = {
  MainTabs: undefined;
  PlayerDetail: { player: Player };
  Players: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={BottomTabNavigator}
          options={{ headerShown: false, title: "" }}
        />
        <Stack.Screen
          name="PlayerDetail"
          component={PlayerDetailScreen}
          options={{
            title: "Detalle del Jugador",
            headerLeft: () => <BackButton />,
            headerStyle: {
              backgroundColor: Colors.primary,
              height: 120,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 16,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
