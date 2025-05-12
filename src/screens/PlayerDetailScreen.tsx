import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../navigation";
import { toggleFavoriteAsync } from "../store/slices/playersSlice";
import Colors from "../constants/colors";
import Layout from "../constants/layout";
import { StatusBar } from "expo-status-bar";

type PlayerDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "PlayerDetail"
>;

const PlayerDetailScreen: React.FC<PlayerDetailScreenProps> = ({ route }) => {
  const { player } = route.params;
  const dispatch = useDispatch();
  const [favorite, setFavorite] = React.useState(player.isFavorite);

  const handleToggleFavorite = () => {
    setFavorite((prev) => !prev);
    dispatch(toggleFavoriteAsync(player.id));
  };

  const biography = `${player.name} es un jugador de golf experimentado con un hándicap de ${player.handicap}. Ha participado en numerosos torneos locales y nacionales, destacando por su técnica y precisión en el campo.

Su trayectoria incluye participaciones destacadas en torneos importantes del circuito amateur. Es conocido por su drive potente y su excelente juego corto, lo que lo convierte en un competidor formidable en cualquier campo.

Además de su pasión por el golf, ${player.name} disfruta compartir su conocimiento con nuevos jugadores y contribuir al crecimiento del deporte en su comunidad local.`;

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri:
              player.image ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnx11tN3I0Tu5Q1Kl0IaT19sBuapHwnhuV0A&s",
          }}
          style={styles.profileImage}
        />

        <View style={styles.nameContainer}>
          <Text style={styles.playerName}>{player.name}</Text>
          <View style={styles.hcpBadge}>
            <Text style={styles.hcpText}>{player.handicap} HCP</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleToggleFavorite}
        >
          <Ionicons
            name={favorite ? "star" : "star-outline"}
            size={28}
            color={favorite ? Colors.favorite : Colors.accent}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Biografía</Text>
        <Text style={styles.biographyText}>{biography}</Text>
      </View>

      {player.patrocinador && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patrocinador</Text>
          <Text style={styles.biographyText}>{player.patrocinador}</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estadísticas</Text>
        <View style={styles.statsContainer}>
          <StatItem label="Torneos" value="12" />
          <StatItem label="Victorias" value="3" />
          <StatItem label="Top 10" value="8" />
        </View>
      </View>
    </ScrollView>
  );
};

const StatItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  profileHeader: {
    backgroundColor: Colors.accent,
    padding: Layout.padding.large,
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  nameContainer: {
    flex: 1,
    marginLeft: Layout.padding.medium,
  },
  playerName: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 5,
  },
  hcpBadge: {
    backgroundColor: Colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: Layout.borderRadius.medium,
    alignSelf: "flex-start",
  },
  hcpText: {
    color: Colors.white,
    fontWeight: "bold",
  },
  favoriteButton: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 22,
  },
  section: {
    padding: Layout.padding.medium,
    marginBottom: Layout.padding.medium,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: Layout.padding.medium,
  },
  biographyText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Layout.padding.small,
  },
  statItem: {
    alignItems: "center",
    padding: Layout.padding.medium,
    backgroundColor: Colors.lightGray,
    borderRadius: Layout.borderRadius.medium,
    minWidth: 100,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.accent,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.darkGray,
    marginTop: 4,
  },
});

export default PlayerDetailScreen;
