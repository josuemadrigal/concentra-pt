import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/colors";
import Layout from "../constants/layout";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Buscar jugador",
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.placeholder}
      />
      <View style={styles.searchIconContainer}>
        <Ionicons name="search" size={24} color={Colors.white} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.searchBackground,
    borderRadius: Layout.borderRadius.large,
    marginHorizontal: Layout.padding.medium,
    marginBottom: Layout.padding.medium,
    elevation: 50,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    paddingVertical: Layout.padding.medium,
    paddingHorizontal: Layout.padding.large,
    fontSize: 16,
    color: Colors.darkGray,
  },
  searchIconContainer: {
    backgroundColor: Colors.searchIcon,
    padding: Layout.padding.medium,
    paddingHorizontal: Layout.padding.large,
    borderRadius: Layout.borderRadius.large,
  },
});

export default SearchBar;
