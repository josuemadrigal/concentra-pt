import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import HomeScreen from "../screens/HomeScreen";
import PlayersListScreen from "../screens/PlayersListScreen";
import GameListScreen from "../screens/GameListScreen";
import FieldScreen from "../screens/FieldScreen";
import Colors from "../constants/colors";
import Layout from "../constants/layout";
import { enableScreens } from "react-native-screens";
import layout from "@/constants/layout";
import BackButton from "@/components/BackButton";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import CalendarScreen from "@/screens/CalendarScreen";

enableScreens();

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const isCenter = index === 2;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        if (isCenter) {
          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={styles.centerButton}
            >
              <View style={styles.centerButtonInner}>
                <FontAwesome6
                  name="golf-ball-tee"
                  size={50}
                  color={Colors.white}
                />
              </View>
              <Text style={styles.centerButtonLabel}>{label}</Text>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tabButton}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
          >
            {options.tabBarIcon &&
              options.tabBarIcon({
                focused: isFocused,
                color: isFocused ? Colors.white : Colors.lightGray,
                size: 24,
              })}
            <Text
              style={[
                styles.tabLabel,
                { color: isFocused ? Colors.white : Colors.lightGray },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Calendario",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="GameList"
        component={GameListScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Lista de juego",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="featured-play-list"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "",
        }}
      />
      <Tab.Screen
        name="Field"
        component={FieldScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Campo",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="golf" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Players"
        component={PlayersListScreen}
        options={{
          title: "Jugadores",
          headerShown: true,
          headerTintColor: Colors.white,

          headerStyle: {
            backgroundColor: Colors.primary,
            height: 120,
          },
          headerLeft: () => <BackButton />,
          tabBarLabel: "Jugador",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    height: 80,
    margin: 20,
    borderRadius: layout.borderRadius.medium + 10,
    elevation: 10,
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: Layout.padding.small,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centerButton: {
    marginTop: -60,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  centerButtonInner: {
    width: 80,
    height: 80,
    borderRadius: Layout.borderRadius.circle,
    backgroundColor: Colors.playerItemBackground,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  centerButtonLabel: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: "600",
    marginTop: 4,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: "600",
    marginTop: 4,
  },
});

export default BottomTabNavigator;
