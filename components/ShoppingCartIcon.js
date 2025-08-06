import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

export default function ShoppingCartIcon() {
    return (
        <View style={styles.container}>
            <Svg width="80" height="60" viewBox="0 0 80 60">
                {/* Cart body */}
                <Path
                    d="M15 12 L70 12 L66 40 L19 40 Z"
                    stroke="#8B4513"
                    strokeWidth="2"
                    fill="none"
                />

                {/* Cart grid lines */}
                <Path d="M25 12 L25 40" stroke="#8B4513" strokeWidth="1" />
                <Path d="M35 12 L35 40" stroke="#8B4513" strokeWidth="1" />
                <Path d="M45 12 L45 40" stroke="#8B4513" strokeWidth="1" />
                <Path d="M55 12 L55 40" stroke="#8B4513" strokeWidth="1" />

                <Path d="M15 20 L70 20" stroke="#8B4513" strokeWidth="1" />
                <Path d="M15 28 L70 28" stroke="#8B4513" strokeWidth="1" />

                {/* Groceries in cart */}
                <Rect x="20" y="15" width="8" height="5" fill="#ff6b35" />
                <Rect x="30" y="22" width="6" height="6" fill="#ffa500" />
                <Rect x="48" y="16" width="7" height="4" fill="#32cd32" />
                <Rect x="40" y="30" width="9" height="6" fill="#ff69b4" />
                <Rect x="58" y="25" width="5" height="8" fill="#1e90ff" />

                {/* Cart handle */}
                <Path
                    d="M8 8 L15 12"
                    stroke="#8B4513"
                    strokeWidth="2"
                    fill="none"
                />
                <Path
                    d="M8 4 L8 16"
                    stroke="#8B4513"
                    strokeWidth="2"
                    fill="none"
                />

                {/* Cart wheels */}
                <Circle cx="25" cy="50" r="4" stroke="#333" strokeWidth="2" fill="white" />
                <Circle cx="60" cy="50" r="4" stroke="#333" strokeWidth="2" fill="white" />

                {/* Cart base */}
                <Path
                    d="M19 40 L66 40 L66 44 L19 44 Z"
                    stroke="#8B4513"
                    strokeWidth="1"
                    fill="#f5f5dc"
                />
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
