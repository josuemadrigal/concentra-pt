import React from "react";
import Svg, { Path } from "react-native-svg";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const TopCurveBackground = () => {
  const height = 140;
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      <Path
        d={`
          M0,0 
          H${width} 
          V${height}
          C  -200,0 -30,-100 0,0
          Z
        `}
        fill="#EF5833"
      />
    </Svg>
  );
};

export default TopCurveBackground;
