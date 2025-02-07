import React from "react";
import { StyleSheet, View } from "react-native";
import { ProgressChart } from "react-native-chart-kit";

import palette from "../../styles/palette";
import { progressData } from "../../utils/constant";

const chartConfig = {
  backgroundColor: "yellow",
  backgroundGradientFrom: "#FFF",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "#FFF",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => palette.grey200,
  fillShadowGradientToOpacity: 1,
  propsForBackgroundLines: {
    stroke: palette.grey200,
    strokeDasharray: "0,0",
    strokeWidth: 1,
  },
  propsForHorizontalLabels: {
    fill: palette.grey500,
    fontSize: 10,
    fontWeight: "bold",
    rotation: 0,
  },
  propsForVerticalLabels: {
    fill: palette.grey500,
    fontSize: 10,
    fontWeight: "bold",
    rotation: 0,
  },
  strokeWidth: 3,
  useShadowColorFromDataset: false,
};

const ProfileRing = () => {
  return (
    <View style={styles.progressRing}>
      <ProgressChart
        withCustomBarColorFromData
        chartConfig={chartConfig}
        data={progressData}
        height={180}
        hideLegend={true}
        radius={86}
        strokeWidth={8}
        width={180}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressRing: {
    alignItems: "center",
    transform: [{ rotate: "180deg" }],
  },
});
export default ProfileRing;
