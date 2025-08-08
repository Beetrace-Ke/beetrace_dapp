import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

interface HoneycombBackgroundProps {
  opacity?: number;
  color?: string;
}

export default function HoneycombBackground({ 
  opacity = 0.1, 
  color = '#F9A826' 
}: HoneycombBackgroundProps) {
  const hexSize = 40;
  const hexHeight = hexSize * Math.sqrt(3);
  const hexWidth = hexSize * 2;
  
  const cols = Math.ceil(width / (hexWidth * 0.75)) + 2;
  const rows = Math.ceil(height / hexHeight) + 2;
  
  const createHexagon = (x: number, y: number, size: number) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const px = x + size * Math.cos(angle);
      const py = y + size * Math.sin(angle);
      points.push(`${px},${py}`);
    }
    return points.join(' ');
  };
  
  const hexagons = [];
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * hexWidth * 0.75;
      const y = row * hexHeight + (col % 2) * (hexHeight / 2);
      
      if (x < width + hexSize && y < height + hexSize) {
        hexagons.push(
          <Polygon
            key={`hex-${row}-${col}`}
            points={createHexagon(x, y, hexSize)}
            fill="none"
            stroke={color}
            strokeWidth="1"
            opacity={opacity}
          />
        );
      }
    }
  }
  
  return (
    <View style={styles.container}>
      <Svg width={width} height={height} style={StyleSheet.absoluteFillObject}>
        {hexagons}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
});