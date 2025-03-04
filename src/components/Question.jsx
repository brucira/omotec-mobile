import Checkbox from "expo-checkbox";
import React, { useCallback, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { Text } from "react-native-paper";

import palette from "../styles/palette";
import { CombinedDefaultTheme } from "../styles/theme";
import { Dimensions } from "../utils/constant";
import Tag from "./Tag";

const Question = ({ questionNumber, options, question, questionType }) => {
  const [data, setData] = useState(options);
  // const [marked, setMarked] = useState(null);
  // const toggleStatusCheckbox = () => setMarked((prev) => !prev);
  const [selectedOption, setSelectedOption] = useState(null);

  const renderItem = useCallback(({ item, drag, isActive }) => {
    return (
      <ScaleDecorator activeScale={0.95}>
        {item.img ? (
          // <ScaleDecorator>
          <View
            style={{
              alignItems: "center",
              flex: 1,
              gap: Dimensions.margin / 1.33,
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text>{item.id}.</Text>
            </View>
            <Image source={item.img} style={styles.imageOption} />
            <TouchableOpacity
              style={[
                styles.rowItem,
                {
                  backgroundColor: isActive
                    ? palette.grey25
                    : item.backgroundColor,
                },
              ]}
              onLongPress={drag}
            >
              <Text style={styles.text}>{item.option}</Text>
              <Image
                source={require("../assets/icons/ham_menu.png")}
                style={styles.menuIcon}
                tintColor={palette.grey700}
              />
            </TouchableOpacity>
          </View>
        ) : (
          // </ScaleDecorator>
          <View
            style={{
              alignItems: "center",
              flex: 1,
              flexDirection: "row",
              gap: Dimensions.margin / 1.33,
            }}
          >
            <View>
              <Text>{item.id}.</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.rowItem,
                {
                  backgroundColor: isActive
                    ? palette.grey25
                    : item.backgroundColor,
                },
              ]}
              onLongPress={drag}
            >
              <Text style={styles.text}>{item.option}</Text>
              <Image
                source={require("../assets/icons/ham_menu.png")}
                style={styles.menuIcon}
                tintColor={palette.grey700}
              />
            </TouchableOpacity>
          </View>
        )}
      </ScaleDecorator>
    );
  }, []);

  return (
    <View>
      <View style={styles.questionContainer}>
        <View style={styles.questionContentContainer}>
          <Text>{questionNumber}.</Text>
          <Text>{question}</Text>
        </View>
        <Tag
          backgroundColor={palette.primaryStudent50}
          label={"1 Mark"}
          textColor={CombinedDefaultTheme.colors.primary}
        />
      </View>

      <View style={styles.optionsContainer}>
        {questionType === "mcq" && (
          <>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                style={styles.individualViewContainer}
                onPress={() => setSelectedOption(index)}
              >
                <Checkbox
                  color={
                    selectedOption === index
                      ? CombinedDefaultTheme.colors.primary
                      : undefined
                  }
                  style={styles.checkbox}
                  value={selectedOption === index}
                />
                <Text
                  style={{
                    color:
                      selectedOption === index
                        ? CombinedDefaultTheme.colors.primary
                        : palette.grey900,
                  }}
                  variant="bodyLarge"
                >
                  {option.option}
                </Text>
              </TouchableOpacity>
            ))}
          </>
        )}

        {questionType === "arrange" && (
          <DraggableFlatList
            activationDistance={0}
            data={data}
            horizontal={data.some((item) => item.img)}
            ItemSeparatorComponent={() => <View style={styles.seperator} />}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            onDragEnd={({ data }) => {
              const updatedData = data.map((item, index) => ({
                ...item,
                id: index + 1,
              }));
              setData(updatedData);
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    borderColor: palette.grey300,
    borderWidth: 1,
  },
  imageOption: {
    height: Dimensions.margin * 5,
    padding: Dimensions.padding / 1.33,
    resizeMode: "contain",
    width: Dimensions.margin * 5,
  },
  individualViewContainer: {
    flexDirection: "row",
    gap: Dimensions.margin / 2,
  },
  menuIcon: {
    height: Dimensions.margin * 1.25,
    width: Dimensions.margin * 1.25,
  },
  optionsContainer: {
    gap: Dimensions.margin / 1.33,
    paddingTop: Dimensions.padding,
  },
  questionContainer: {
    flexDirection: "row",
    gap: Dimensions.margin,
  },
  questionContentContainer: {
    flex: 1,
    flexDirection: "row",
    // maxWidth: 273,
  },
  rowItem: {
    borderColor: palette.grey200,
    borderRadius: Dimensions.margin / 2,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    gap: Dimensions.margin / 2,
    justifyContent: "space-between",
    paddingHorizontal: Dimensions.padding / 1.33,
    paddingVertical: Dimensions.padding / 2,
  },
  seperator: {
    height: Dimensions.margin / 1.33,
    width: Dimensions.margin / 1.33,
  },
});

export default Question;
