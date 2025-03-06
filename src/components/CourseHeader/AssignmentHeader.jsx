import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import AssignmentModal from "../AssignmentModal";
import CourseTabBack from "../CourseTabBack";

const AssignmentHeader = () => {
  const [showModal, setShowModal] = React.useState(false);
  const submitHandler = () => {
    setShowModal(true);
  };

  const onFileSaveHandler = () => {
    setShowModal(false);
  };

  if (showModal) {
    return (
      <AssignmentModal
        hideModal={() => setShowModal(false)}
        visible={showModal}
        onSavePress={onFileSaveHandler}
      />
    );
  }

  return (
    <View
      style={{
        backgroundColor: "#F9FAFB",
        paddingBottom: 24,
        paddingTop: 12,
        rowGap: 24,
      }}
    >
      <CourseTabBack />
      <View style={{ paddingHorizontal: 16, rowGap: 16 }}>
        <View
          style={{
            alignItems: "center",
            flex: 1,
            flexDirection: "row",
          }}
        >
          <Text style={{ color: "#101828", flex: 1 }} variant="bodyMedium">
            How can I create and organize robotics course materials on an LMS?
          </Text>
          <View
            style={{
              backgroundColor: "#F6EBFF",
              borderRadius: 40,
              columnGap: 8,
              paddingHorizontal: 8,
              paddingVertical: 3,
            }}
          >
            <Text style={{ color: "#852DCD" }} variant="labelMedium">
              10 Marks
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.ratingButtonStyle}
            onPress={submitHandler}
          >
            <Text
              style={{ color: "#FFFFFF", textAlign: "center" }}
              variant="labelLarge"
            >
              Submit
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
        </View>
      </View>
    </View>
  );
};

export default AssignmentHeader;

const styles = StyleSheet.create({
  ratingButtonStyle: {
    alignItems: "center",
    backgroundColor: "#852DCD",
    borderColor: "#852DCD",
    borderRadius: 14,
    columnGap: 8,
    elevation: 4,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 10,
    shadowColor: "#60179C",
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
});
