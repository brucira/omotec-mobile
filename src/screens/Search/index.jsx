import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Appbar, Avatar, Chip, Searchbar, Text } from "react-native-paper";

import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import {
  browseCourseCardData,
  Dimensions,
  popularCourseCardData,
  RouteNames,
  suggestions,
} from "../../utils/constant";
import PopularCourseCard from "./PopularCourseCard";
import SearchCourseCard from "./SearchCourseCard";

const Search = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([
    "Physics",
    "Maths",
    "Robotics",
    "AI",
    "Python",
  ]);
  const [showResults, setShowResults] = useState(false);

  const keyExtractor = (item) => item.id.toString();

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      setShowResults(true);
      const filtered = suggestions.filter((item) => {
        return item.toLowerCase().includes(query.toLowerCase());
      });
      setFilteredSuggestions(filtered);
    } else {
      setShowResults(false);
      setFilteredSuggestions([]);
    }
  };

  const handleSearchSubmit = () => {
    setFilteredSuggestions([]);
  };
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setFilteredSuggestions([]);
    setShowResults(true);
  };

  const removeChip = (chip) => {
    const updatedSearches = recentSearches.filter((item) => item !== chip);
    setRecentSearches(updatedSearches);
  };
  const renderItem = ({ item }) => <PopularCourseCard {...item} />;
  const renderItemSeperator = () => <View style={styles.seperator} />;
  const renderCourseCardItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSuggestionClick(item)}>
      <View style={styles.suggestionItem}>
        <Image
          source={require("../../assets/icons/search.png")}
          style={styles.searchIcon}
        />
        <Text>{item}</Text>
      </View>
    </TouchableOpacity>
  );
  const renderSearchIcon = () => (
    <Image
      source={require("../../assets/icons/search.png")}
      style={styles.lens}
    />
  );
  const renderSearchCourseCard = (item, index) => (
    <SearchCourseCard key={item.id} {...item} />
  );
  const renderSearchChip = (chip, index) => (
    <Chip
      key={chip + index}
      compact
      mode="outlined"
      style={styles.chip}
      textStyle={styles.chipContent}
      onClose={() => removeChip(chip)}
    >
      {chip}
    </Chip>
  );
  return (
    <View style={styles.container}>
      <Appbar style={styles.appBarContainer}>
        <Appbar.Content title={<Text variant="headlineSmall">Search</Text>} />
        <Appbar.Action
          icon={require("../../assets/icons/notification.png")}
          onPress={() => navigation.navigate(RouteNames.Notifications)}
        />
        <Appbar.Action
          icon={(props) => (
            <Avatar.Image
              {...props}
              source={require("../../assets/avatar.png")}
            />
          )}
          onPress={() => navigation.navigate(RouteNames.Profile)}
        />
      </Appbar>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.contentContainer}
      >
        <View style={styles.searchContainer}>
          <Searchbar
            icon={renderSearchIcon}
            inputStyle={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={palette.grey400}
            style={styles.searchBar}
            value={searchQuery}
            onChangeText={handleSearch}
            onSubmitEditing={handleSearchSubmit}
          />
          <Image
            source={require("../../assets/icons/mic.png")}
            style={styles.mic}
          />
        </View>
        {filteredSuggestions.length > 0 && searchQuery && (
          <FlatList
            data={filteredSuggestions}
            ItemSeparatorComponent={renderItemSeperator}
            keyExtractor={keyExtractor}
            renderItem={renderCourseCardItem}
            scrollEnabled={false}
            style={styles.suggestionList}
          />
        )}
        {!showResults && recentSearches.length > 0 && (
          <View style={styles.recentSearches}>
            <Text variant="titleLarge">Recent searches</Text>
            <View style={styles.itemSearched}>
              {recentSearches.map((chip, index) => {
                return renderSearchChip(chip, index);
              })}
            </View>
          </View>
        )}
        {!showResults && (
          <View>
            <View style={styles.recentSearches}>
              <Text variant="titleLarge">Popular courses</Text>
              <View style={styles.popularCardContainer}>
                <FlatList
                  contentContainerStyle={styles.arrowIndicator}
                  data={popularCourseCardData}
                  horizontal={true}
                  keyExtractor={keyExtractor}
                  renderItem={renderItem}
                />
              </View>
            </View>
            <View style={styles.recentSearches}>
              <Text variant="titleLarge">Browse all</Text>
              <View style={styles.browseCourseCard}>
                {browseCourseCardData.map((item, index) => {
                  return renderSearchCourseCard(item, index);
                })}
              </View>
            </View>
          </View>
        )}
        {showResults && (
          <View style={styles.browseCourseCard}>
            {browseCourseCardData.map((item, index) => {
              return renderSearchCourseCard(item, index);
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  appBarContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderBottomWidth: 1,
    borderColor: palette.grey200,
  },
  browseCourseCard: {
    gap: Dimensions.margin / 1.33,
    paddingVertical: Dimensions.padding / 1.142,
  },
  chip: {
    // alignSelf: "baseline",
    // borderWidth: 1,
    backgroundColor: palette.transparent,
    borderColor: palette.grey200,
    borderRadius: Dimensions.padding * 2,
  },
  chipContent: {
    color: palette.grey700,
  },
  closeIcon: {
    height: Dimensions.margin / 1.142,
    resizeMode: "contain",
    width: Dimensions.margin / 1.142,
  },
  container: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: Dimensions.padding,
    paddingVertical: Dimensions.padding * 1.25,
  },
  itemSearched: {
    columnGap: Dimensions.margin / 2.66,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: Dimensions.padding / 1.14,
    rowGap: Dimensions.margin / 1.6,
  },
  itemSeparator: {
    width: 12,
  },
  lens: {
    height: Dimensions.margin * 1.25,
    left: Dimensions.margin / 4,
    marginLeft: 0,
    paddingLeft: 0,
    position: "absolute",
    resizeMode: "contain",
    width: Dimensions.margin * 1.25,
  },
  mic: {
    height: Dimensions.margin * 1.5,
    width: Dimensions.margin * 1.5,
  },
  ongoingCardList: {
    gap: Dimensions.padding / 1.33,
  },
  popularCardContainer: {
    paddingTop: Dimensions.padding / 1.142,
  },
  recentSearches: {
    paddingTop: Dimensions.padding * 1.25,
  },
  searchBar: {
    backgroundColor: palette.grey25,
    borderColor: palette.grey200,
    borderWidth: 1,
    flex: 1,
    marginLeft: 0,
    maxHeight: 40,
    minHeight: 40,
    paddingLeft: 0,
  },
  searchContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: Dimensions.margin / 2,
  },
  searchIcon: {
    height: Dimensions.margin * 1.25,
    width: Dimensions.margin * 1.25,
  },
  searchInput: {
    color: palette.grey900,
    fontSize: 14,
    left: -(Dimensions.margin / 1.33),
    marginLeft: 0,
    marginRight: 0,
    minHeight: 0,
    paddingVertical: 0,
    position: "relative",
  },
  seperator: {
    width: Dimensions.margin / 1.33,
  },
  suggestionItem: {
    alignItems: "center",
    borderBottomColor: palette.grey200,
    // borderBottomWidth: 1,
    flexDirection: "row",
    gap: Dimensions.margin / 1.6,
    paddingHorizontal: Dimensions.padding / 1.6,
    paddingVertical: Dimensions.padding / 1.33,
  },

  suggestionList: {
    borderColor: palette.grey200,
    // borderWidth: 1,
    marginTop: 8,
    // maxHeight: 200,
  },
});

export default Search;
