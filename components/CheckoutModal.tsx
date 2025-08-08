import React, { useRef, useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    TouchableOpacity,
    FlatList,
    Image,
    Animated,
    Dimensions,
    SafeAreaView,
    ScrollView
} from 'react-native';
import { TabBarIcon } from './navigation/TabBarIcon';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

export default function CheckoutModal({ visible, onClose, cartItems, onOrderComplete }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return total + (price * (item.quantity || 1));
        }, 0).toFixed(2);
    };

    const renderOrderItem = ({ item }) => (
        <View style={styles.orderItem}>
            <View style={styles.itemImageContainer}>
                <Image
                    source={item.image}
                    style={styles.itemImage}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>Qty: {item.quantity || 1}</Text>
            </View>

            <Text style={styles.itemPrice}>{item.price}</Text>
        </View>
    );

    const handlePlaceOrder = () => {
        // Simulate order processing
        onOrderComplete && onOrderComplete();
        onClose();
        // You can add navigation to order confirmation screen here
    };

    return (
        <Modal
            visible={visible}
            transparent={false} // Changed to false for full screen
            animationType="none"
            onRequestClose={onClose}
        >
            <Animated.View
                style={[
                    styles.fullScreenContainer,
                    {
                        opacity: fadeAnim
                    }
                ]}
            >
                <SafeAreaView style={styles.safeArea}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={onClose}
                        >
                            <TabBarIcon name="arrow-back" color="#333" size={24} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Checkout</Text>
                        <View style={styles.placeholder} />
                    </View>

                    <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                        {/* Order Items Section */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Order Items ({cartItems.length})</Text>
                            <FlatList
                                data={cartItems}
                                renderItem={renderOrderItem}
                                keyExtractor={(item, index) => `${item.sectionName}_${item.id}_${index}`}
                                scrollEnabled={false}
                                contentContainerStyle={styles.orderList}
                            />
                        </View>

                        <View style={styles.bottomSpacing} />
                    </ScrollView>

                    {/* Place Order Button */}
                    <View style={styles.bottomSection}>
                        <TouchableOpacity
                            style={styles.placeOrderButton}
                            onPress={handlePlaceOrder}
                        >
                            <Text style={styles.placeOrderButtonText}>
                                Place Order - ${getTotalPrice()}
                            </Text>
                            <TabBarIcon name="arrow-forward" color="#fff" size={18} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    // Full Screen Container - New
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        backgroundColor: '#ffffff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    placeholder: {
        width: 40,
    },
    scrollContainer: {
        flex: 1,
        // backgroundColor: '#f9f9f9',
    },
    section: {
        // backgroundColor: '#ffffff',
        marginHorizontal: 16,
        marginTop: 16,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 12,
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.1,
        // shadowRadius: 4,
        // elevation: 3,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },

    // Order Items
    orderList: {
        paddingBottom: 10,
    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f8f8f8',
    },
    itemImageContainer: {
        width: 70,
        height: 70,
        backgroundColor: '#f8f8f8',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    itemImage: {
        width: 55,
        height: 55,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
    },
    itemQuantity: {
        fontSize: 15,
        color: '#666',
        fontWeight: '500',
    },
    itemPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#e53e3e',
    },

    // Bottom Section
    bottomSpacing: {
        height: 50,
    },
    bottomSection: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    placeOrderButton: {
        backgroundColor: '#e53e3e',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 18,
        borderRadius: 15,
        shadowColor: '#e53e3e',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 10,
    },
    placeOrderButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginRight: 8,
    },
});
