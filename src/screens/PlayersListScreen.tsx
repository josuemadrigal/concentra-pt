import React, { useEffect, useCallback } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import { RootState } from "../store";
import {
  fetchPlayersAsync,
  setSearchQuery,
  setSelectedGroup,
} from "../store/slices/playersSlice";
import TabSelector from "../components/TabSelector";
import SearchBar from "../components/SearchBar";
import PlayerItem from "../components/PlayerItem";
import Loader from "../components/Loader";
import { Player, PlayerGroup } from "../types";
import Colors from "../constants/colors";
import TopCurveBackground from "@/components/TopCurveBackground";

type PlayersListScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Players">;
};

const PlayersListScreen: React.FC<PlayersListScreenProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const { filteredPlayers, loading, error, searchQuery, selectedGroup } =
    useSelector((state: RootState) => state.players);

  const handleSelectGroup = useCallback(
    (group: PlayerGroup) => dispatch(setSelectedGroup(group)),
    [dispatch]
  );

  const handleSearch = useCallback(
    (text: string) => dispatch(setSearchQuery(text)),
    [dispatch]
  );

  const handleSelectPlayer = useCallback(
    (player: Player) => navigation.navigate("PlayerDetail", { player }),
    [navigation]
  );

  useEffect(() => {
    dispatch(fetchPlayersAsync());
  }, [dispatch]);

  const renderPlayerItem = useCallback(
    ({ item }: { item: Player }) => (
      <PlayerItem player={item} onPress={handleSelectPlayer} />
    ),
    [handleSelectPlayer]
  );

  const keyExtractor = useCallback((item: Player) => item.id, []);

  if (loading && filteredPlayers.length === 0) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <TopCurveBackground />

      <TabSelector
        selectedGroup={selectedGroup}
        onSelectGroup={handleSelectGroup}
      />

      <SearchBar value={searchQuery} onChangeText={handleSearch} />

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredPlayers}
          keyExtractor={keyExtractor}
          renderItem={renderPlayerItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No se encontraron jugadores</Text>
            </View>
          }
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  listContent: {
    paddingBottom: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.darkGray,
    textAlign: "center",
  },
});

export default PlayersListScreen;
