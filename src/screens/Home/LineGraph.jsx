import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Svg, { Polygon, Rect, Text } from "react-native-svg";

import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions, lineGraphData } from "../../utils/constant";

const chartConfig = {
  backgroundGradientFrom: CombinedDefaultTheme.colors.background,
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: CombinedDefaultTheme.colors.background,
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(7, 150, 104, ${opacity})`,
  decimalPlaces: 0,
  fillShadowGradientFrom: palette.linearGradient,
  fillShadowGradientFromOpacity: 0.1,
  fillShadowGradientTo: palette.transparent,
  fillShadowGradientToOpacity: 0,
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
const LineGraph = () => {
  const [tooltipPos, setTooltipPos] = useState({
    value: 0,
    visible: false,
    x: 0,
    y: 0,
  });

  const onDataPointClick = (data) => {
    setTooltipPos((prevState) => {
      const isSamePoint = prevState.x === data.x && prevState.y === data.y;
      return {
        value: data.value,
        visible: isSamePoint ? !prevState.visible : true,
        x: data.x,
        y: data.y,
      };
    });
  };

  const renderDecorator = () => {
    return tooltipPos.visible ? (
      <View>
        <Svg>
          <Rect
            fill={palette.grey900}
            height="20"
            rx={5}
            ry={5}
            width="14%"
            x={tooltipPos.x - 24}
            y={tooltipPos.y - 30}
          />
          <Polygon
            points={`${tooltipPos.x},${tooltipPos.y - 5} 
                  ${tooltipPos.x - 5},${tooltipPos.y - 10} 
                  ${tooltipPos.x + 5},${tooltipPos.y - 10}`}
            fill={palette.grey900}
          />
          <Text
            fill="white"
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
            x={tooltipPos.x}
            y={tooltipPos.y - 16}
          >
            {tooltipPos.value + "%"}
          </Text>
        </Svg>
      </View>
    ) : null;
  };
  return (
    <View style={{}}>
      <LineChart
        // bezier
        chartConfig={chartConfig}
        data={lineGraphData}
        decorator={renderDecorator}
        fromZero={true}
        height={278}
        segments={5}
        style={styles.lineGraph}
        width={331}
        withDots={true}
        withHorizontalLines={true}
        withShadow={true}
        withVerticalLines={false}
        yAxisInterval={20}
        yAxisSuffix="%"
        onDataPointClick={onDataPointClick}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  lineGraph: {
    borderRadius: 16,
    paddingTop: Dimensions.margin * 2.25,
  },
});
export default LineGraph;
