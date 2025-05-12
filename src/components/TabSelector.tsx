import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { PlayerGroup } from "../types";
import Colors from "../constants/colors";
import Layout from "../constants/layout";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

interface TabSelectorProps {
  selectedGroup: PlayerGroup;
  onSelectGroup: (group: PlayerGroup) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({
  selectedGroup,
  onSelectGroup,
}) => {
  const groups: PlayerGroup[] = [1, 2, 3];
  const animation = useRef(new Animated.Value(0)).current;
  const tabRefs = groups.map(() => React.createRef<View>());

  const tabPositions = useRef<{ [key: number]: number }>({}).current;

  useEffect(() => {
    Animated.spring(animation, {
      toValue: selectedGroup,
      useNativeDriver: false,
      damping: 15,
      stiffness: 100,
    }).start();
  }, [selectedGroup]);

  const handleLayout = (group: PlayerGroup, event: any) => {
    const { x } = event.nativeEvent.layout;
    tabPositions[group] = x;
  };

  const translateX = animation.interpolate({
    inputRange: [1, 2, 3],
    outputRange: [
      0,
      tabPositions[2] - tabPositions[1] || 0,
      tabPositions[3] - tabPositions[1] || 0,
    ],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedBackground,
          {
            width: `${100 / groups.length}%`,
            transform: [{ translateX }],
          },
        ]}
      />

      {groups.map((group) => (
        <TouchableOpacity
          key={group}
          ref={tabRefs[group - 1]}
          style={[styles.tab]}
          onPress={() => onSelectGroup(group)}
          onLayout={(event) => handleLayout(group, event)}
        >
          <Text
            style={[
              styles.tabText,
              selectedGroup === group && styles.selectedTabText,
            ]}
          >
            {group === 1 ? "A" : group === 2 ? "B" : "C"}
          </Text>

          {selectedGroup === group && (
            <FontAwesome5 name="check" size={15} color={Colors.white} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.large,
    marginHorizontal: Layout.padding.large + 30,
    marginVertical: Layout.padding.medium,
    marginTop: Layout.padding.large + 50,
    overflow: "hidden",
    elevation: 5,
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 20, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    position: "relative",
  },
  animatedBackground: {
    position: "absolute",
    backgroundColor: Colors.selectedTab,
    borderRadius: Layout.borderRadius.large,
    top: 0,
    bottom: 0,
    left: 0,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    gap: Layout.padding.small,
    paddingVertical: Layout.padding.medium,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  tabText: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.primary,
  },
  selectedTabText: {
    color: Colors.white,
  },
});

export default TabSelector;
