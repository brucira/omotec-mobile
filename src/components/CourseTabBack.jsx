import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import React from "react";
import { TouchableOpacity } from "react-native";

const CourseTabBack = ({ style = {} }) => {
  const navigation = useNavigation();

  const gobackHandler = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
    }
  };

  return (
    <TouchableOpacity style={style} onPress={gobackHandler}>
      <Image
        source={require("../assets/icons/chevron_left.png")}
        style={{ height: 24, width: 24 }}
      />
    </TouchableOpacity>
  );
};

export default CourseTabBack;
