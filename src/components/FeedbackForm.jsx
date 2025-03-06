import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";

import palette from "../styles/palette";
import { CombinedDefaultTheme } from "../styles/theme";

export default function FeedbackForm({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const handleRatingPress = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSaveAndContinue = () => {
    setShowFeedback(true);
  };

  const handleSaveAndExit = () => {
    if (rating > 0) {
      if (onSubmit) {
        onSubmit(rating, feedback);
      }
      setRating(0);
      setFeedback("");
      setShowFeedback(false);
    }
  };

  const handleCancel = () => {
    setFeedback("");
    setRating(0);
    setShowFeedback(false);
  };

  if (showFeedback) {
    return (
      <View style={styles.container}>
        <View style={styles.ratingContainer}>
          <Text style={styles.title} variant="titleLarge">
            Why did you leave this rating?
          </Text>

          <View style={styles.feedbackWrapper}>
            <Text style={styles.subtitle} variant="titleSmall">
              Good/ Amazing
            </Text>

            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star, index) => (
                <View
                  key={star}
                  style={styles.starButton}
                  onPress={() => handleRatingPress(star)}
                >
                  {index < rating ? (
                    <Image
                      source={require("../../src/assets/icons/star.png")}
                      style={{ height: 32, width: 32 }}
                    ></Image>
                  ) : (
                    <Image
                      source={require("../../src/assets/icons/star_2.png")}
                      style={{ height: 32, width: 32 }}
                    ></Image>
                  )}
                </View>
              ))}
            </View>
          </View>
          <TextInput
            multiline
            numberOfLines={3}
            placeholder="Tell us about your own personal experience taking this course. Was it a good match for you?"
            placeholderTextColor="#A0A0A0"
            style={styles.input}
            value={feedback}
            onChangeText={setFeedback}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text
              style={[styles.buttonText, { color: "#101828" }]}
              variant="labelMedium"
              onPress={handleCancel}
            >
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonStyle, styles.submitButton]}
            onPress={handleSaveAndExit}
          >
            <Text style={styles.buttonText} variant="labelLarge">
              Save & Exit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.title} variant="titleLarge">
          How would you rate your experience with the Trainer so far?
        </Text>

        <View style={styles.feedbackWrapper}>
          <Text style={styles.subtitle} variant="titleSmall">
            Select Rating
          </Text>

          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star, index) => (
              <TouchableOpacity
                key={star}
                style={styles.starButton}
                onPress={() => handleRatingPress(star)}
              >
                {index < rating ? (
                  <Image
                    source={require("../../src/assets/icons/star.png")}
                    style={{ height: 32, width: 32 }}
                  ></Image>
                ) : (
                  <Image
                    source={require("../../src/assets/icons/star_2.png")}
                    style={{ height: 32, width: 32 }}
                  ></Image>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonStyle} onPress={handleCancel}>
          <Text
            style={[styles.buttonText, { color: "#101828" }]}
            variant="labelMedium"
          >
            Cancel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={!rating}
          style={[styles.buttonStyle, styles.disableSubmitButton]}
          onPress={handleSaveAndContinue}
        >
          <Text style={styles.buttonText} variant="labelLarge">
            Save & Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: "#fff",
    borderColor: "#E5E5E5",
    borderRadius: 100,
    borderWidth: 1,
    flex: 1,
    padding: 16,
  },
  backButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: palette.grey200,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 2, // For Android
    flex: 1,
    height: 40,
    justifyContent: "center",
    shadowColor: palette.grey200,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  buttonText: {
    color: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "#fff",
    borderColor: "#E5E5E5",
    borderRadius: 100,
    borderWidth: 1,
    flex: 1,
    padding: 16,
  },
  cancelButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  container: {
    backgroundColor: "#fff",
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 24,
    rowGap: 32,
    width: "100%",
  },
  continueButton: {
    backgroundColor: "#8B5CF6",
    borderRadius: 100,
    flex: 1,
    padding: 16,
  },
  continueButtonDisabled: {
    backgroundColor: "#E5E5E5",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  disableSubmitButton: {
    backgroundColor: "#C586F9",
    borderColor: "#C586F9",
    shadowColor: "#B46CEF",
  },
  feedbackWrapper: {
    rowGap: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: palette.grey200,
    borderRadius: 8,
    borderWidth: 1,
    color: palette.grey900,
    elevation: 2,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    minHeight: 76,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: palette.grey900,
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  rating: {
    color: palette.grey900,
    fontSize: 18,
    textAlign: "center",
  },
  ratingContainer: {
    rowGap: 24,
  },
  ratingLabel: {
    color: "#000",
    fontSize: 16,
    marginVertical: 12,
    textAlign: "center",
  },
  saveExitButton: {
    backgroundColor: "#8B5CF6",
    borderRadius: 100,
    flex: 1,
    padding: 16,
  },
  saveExitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  starButton: {
    padding: 8,
  },
  starsContainer: {
    alignItems: "center",
    columnGap: 8,
    flexDirection: "row",
    justifyContent: "center",
  },
  submitButton: {
    backgroundColor: CombinedDefaultTheme.colors.primary,
    borderColor: CombinedDefaultTheme.colors.primary,
    shadowColor: palette.purple600,
  },
  subtitle: {
    color: palette.grey900,
    textAlign: "center",
  },
  title: {
    color: palette.grey900,
    fontSize: 18,
    textAlign: "center",
  },
});
