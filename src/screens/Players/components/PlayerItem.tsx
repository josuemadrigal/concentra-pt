import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Player } from "../../../types";
import Colors from "../../../constants/colors";
import Layout from "../../../constants/layout";

interface PlayerItemProps {
  player: Player;
  onPress: (player: Player) => void;
}

const PlayerItem: React.FC<PlayerItemProps> = ({ player, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(player)}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              player.image ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnx11tN3I0Tu5Q1Kl0IaT19sBuapHwnhuV0A&s",
          }}
          style={styles.avatar}
        />
        {player.isFavorite && (
          <Ionicons
            name="star"
            size={10}
            color={Colors.white}
            style={styles.favoriteIcon}
          />
        )}
      </View>
      <Text style={styles.name}>{player.name}</Text>
      <View style={styles.rightContainer}>
        <View style={styles.hcpContainer}>
          <Text style={styles.hcpValue}>{Math.round(player.handicap)}</Text>
          <Text style={styles.hcpLabel}>HCP</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.medium,
    marginHorizontal: Layout.padding.medium,
    marginVertical: Layout.padding.small / 2,
    padding: Layout.padding.medium,
  },
  imageContainer: {},
  avatar: {
    width: 48,
    height: 48,
    borderRadius: Layout.borderRadius.circle,
    borderColor: Colors.primary,
    borderWidth: 2,
    marginRight: Layout.padding.small,
  },
  favoriteIcon: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingHorizontal: Layout.padding.small,
    paddingVertical: 1,
    marginLeft: 1,
    backgroundColor: Colors.primary,
    borderRadius: Layout.borderRadius.medium,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: Colors.playerItemText,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  hcpContainer: {
    alignItems: "center",
    width: 60,
    height: 50,
    backgroundColor: Colors.playerItemBackground,
    borderRadius: Layout.borderRadius.medium,
    paddingVertical: Layout.padding.small,
    paddingHorizontal: Layout.padding.small,
  },
  hcpValue: {
    fontSize: 12,
    color: Colors.white,
  },
  hcpLabel: {
    fontSize: 12,
    color: Colors.white,
  },
});

export default PlayerItem;
