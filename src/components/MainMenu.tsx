import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

export function MainMenu({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          (options.tabBarLabel as string) || options.title || route.name;
        const isFocused = state.index === index;

        // Determinar qué icono mostrar basado en la ruta
        let iconName: keyof typeof Ionicons.glyphMap = "calendar-outline";
        switch (route.name) {
          case "Calendario":
            iconName = "calendar-outline";
            break;
          case "ListaDePago":
            iconName = "list-outline";
            break;
          case "Campo":
            iconName = "golf-outline";
            break;
          case "Jugador":
            iconName = "person-outline";
            break;
          default:
            iconName = "calendar-outline";
        }

        // Para el botón especial central (Campo)
        if (route.name === "Campo") {
          return (
            <View key={route.key} style={styles.centerButtonContainer}>
              <TouchableOpacity
                style={styles.centerButton}
                onPress={() => navigation.navigate(route.name)}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
              >
                <Ionicons name={iconName} color="#fff" size={30} />
              </TouchableOpacity>
            </View>
          );
        }

        // Para los botones de pestaña normales
        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabButton}
            onPress={() => navigation.navigate(route.name)}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
          >
            <Ionicons
              name={iconName}
              color={isFocused ? "#fff" : "#ccc"}
              size={24}
            />
            <Text
              style={[styles.tabLabel, { color: isFocused ? "#fff" : "#ccc" }]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#E74C3C", // Color rojo/naranja similar al de la imagen
    height: 70,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 0,
    paddingHorizontal: 5,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  centerButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerButton: {
    backgroundColor: "#2980B9", // Color azul para el botón central
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    position: "absolute",
    bottom: 5, // Ajusta según necesites para que parezca que flota sobre la barra
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});
