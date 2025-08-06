import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ShoppingCartIcon from './ShoppingCartIcon';

export default function GrocifySplashScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <ShoppingCartIcon />
                <Text style={styles.logoText}>Grocify</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#e53e3e',
        marginTop: 20,
        fontFamily: 'System', // You can replace with custom font
    },
});
