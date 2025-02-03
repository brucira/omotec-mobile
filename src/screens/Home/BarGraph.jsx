import React from "react";
import { StyleSheet, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

import palette from "../../styles/palette";
import { barGraphData, Dimensions } from "../../utils/constant";

const chartConfig = {
  backgroundGradientFrom: "#FFF",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#FFF",
  backgroundGradientToOpacity: 0.5,
  barPercentage: 0.7,
  barRadius: 8,
  color: (opacity = 1) => `rgba(7, 150, 104, ${opacity})`,
  decimalPlaces: 0,
  fillShadowGradientFromOpacity: 1,
  fillShadowGradientToOpacity: 1,
  propsForBackgroundLines: {
    stroke: palette.grey200,
    strokeDasharray: "0,0",
    strokeWidth: 1,
    x: 60,
  },

  propsForHorizontalLabels: {
    fill: palette.grey500,
    fontSize: 10,
    fontWeight: "bold",
    rotation: 0,
  },
  propsForVerticalLabels: {
    // dx: 36,
    // dx: 34,
    fill: palette.grey500,
    fontSize: 10,
    fontWeight: "bold",
    rotation: 0,
  },
  strokeWidth: 3,

  useShadowColorFromDataset: false,
};
const BarGraph = ({ barChartBackground }) => {
  return (
    <View>
      <BarChart
        chartConfig={{
          ...chartConfig,
          fillShadowGradientFrom: barChartBackground,
          fillShadowGradientTo: barChartBackground,
        }}
        data={barGraphData}
        fromZero={true}
        height={278}
        segments={5}
        showBarTops={false}
        style={styles.barChart}
        width={331}
        yAxisInterval={20}
        yAxisSuffix="%"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  barChart: {
    borderRadius: 16,
    paddingTop: Dimensions.margin * 1.5,
  },
});

export default BarGraph;
