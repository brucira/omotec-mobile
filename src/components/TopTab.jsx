import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import palette from "../styles/palette";
import { CombinedDefaultTheme } from "../styles/theme";
import { Dimensions } from "../utils/constant";

const TopTab = ({ activeTab, setActiveTab, tabData }) => {
  const renderTab = (tab, index) => {
    return (
      <View key={tab.id} style={styles.headerContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === tab && styles.activeTab,
            activeTab !== tab && styles.inactiveTab,
          ]}
          onPress={() => setActiveTab(tab)}
        >
          <Text
            style={activeTab === tab ? styles.activeTabText : styles.tabText}
          >
            {tab.city}
          </Text>
          {activeTab === tab && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <View style={[styles.tabs, { borderBottomWidth: activeTab ? 1 : 0 }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tabs}>
            {tabData.map((tab, index) => renderTab(tab, index))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  activeTab: {
    borderBottomColor: CombinedDefaultTheme.colors.primary,
    // borderBottomWidth: Dimensions.margin / 5.3,
  },
  activeTabIndicator: {
    backgroundColor: CombinedDefaultTheme.colors.primary,
    borderTopLeftRadius: Dimensions.margin / 2,
    borderTopRightRadius: Dimensions.margin / 2,
    height: Dimensions.margin / 5.3,
    marginTop: Dimensions.padding / 1.6,
  },
  activeTabText: {
    color: CombinedDefaultTheme.colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
  inactiveTab: {
    borderBottomWidth: 0,
  },
  tab: {
    flex: 1,
    paddingTop: Dimensions.padding / 1.6,
  },
  tabText: {
    color: CombinedDefaultTheme.colors.tertiary,
    fontSize: Dimensions.margin,
  },
  tabs: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderBottomColor: palette.grey200,
    flexDirection: "row",
    gap: Dimensions.margin * 1.5,
    justifyContent: "space-around",
    paddingRight: Dimensions.padding / 2,
  },
});

export default TopTab;
