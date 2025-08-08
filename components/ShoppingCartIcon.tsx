import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function ShoppingCartIcon() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/(tabs)/home'); // Navigate to home after 4 seconds
        }, 2000); // Changed from 2000 to 4000 (4 seconds)

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/animations/cartgif.gif')}
                style={styles.gif}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        width: 120,
    },
    gif: {
        width: 400,
        height: 400,
    },
});
