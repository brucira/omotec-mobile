import React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Avatar, Text } from "react-native-paper";

import { CombinedDefaultTheme } from "../styles/theme";
import { Dimensions, RouteNames } from "../utils/constant";

const Search = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Appbar style={styles.appBarContainer}>
        <Appbar.Content title={<Text variant="headlineSmall">Home</Text>} />
        <Appbar.Action
          icon={require("../assets/icons/notification.png")}
          onPress={() => navigation.navigate(RouteNames.Notifications)}
        />
        <Appbar.Action
          icon={(props) => (
            <Avatar.Image {...props} source={require("../assets/avatar.png")} />
          )}
          onPress={() => navigation.navigate(RouteNames.Profile)}
        />
      </Appbar>
      <View style={styles.contentContainer}>
        <Text>Search</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appBarContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderBottomLeftRadius: Dimensions.padding,
    borderBottomRightRadius: Dimensions.padding,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: Dimensions.padding,
  },
});

export default Search;
