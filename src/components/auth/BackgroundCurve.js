import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export const BackgroundCurve = ({ style, svg, viewAbove, colorSvg }) => {
    return (
        <View style={style}>
            <View style={viewAbove} />
            <Svg height="50%" width="100%" style={svg} viewBox="0 0 1440 320">
                <Path
                    fill={colorSvg} fill-opacity="1" d="M0,288L48,293.3C96,299,192,309,288,272C384,235,480,149,576,144C672,139,768,213,864,240C960,267,1056,245,1152,208C1248,171,1344,117,1392,90.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                />
            </Svg>
        </View>
    );
};
