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
    SafeAreaView
} from 'react-native';
import { TabBarIcon } from './navigation/TabBarIcon';
import CheckoutModal from './CheckoutModal';

const { height: screenHeight } = Dimensions.get('window');

export default function BasketModal({ visible, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
    const slideAnim = useRef(new Animated.Value(screenHeight)).current;
    const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);

    useEffect(() => {
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: screenHeight,
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

    const handleOrderComplete = () => {
        // Handle order completion - close both modals and clear cart if needed
        setIsCheckoutVisible(false);
        onClose(); // Close basket modal
        // You can add additional logic here like clearing the cart
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <View style={styles.itemImageContainer}>
                <Image
                    source={item.image}
                    style={styles.itemImage}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
                <View style={styles.ratingContainer}>
                    <TabBarIcon name="star" color="#FFD700" size={12} />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
            </View>

            <View style={styles.quantityContainer}>
                <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => onUpdateQuantity(item, -1)}
                >
                    <TabBarIcon name="remove" color="#e53e3e" size={16} />
                </TouchableOpacity>

                <Text style={styles.quantityText}>{item.quantity || 1}</Text>

                <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => onUpdateQuantity(item, 1)}
                >
                    <TabBarIcon name="add" color="#e53e3e" size={16} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => onRemoveItem(item)}
            >
                <TabBarIcon name="trash-outline" color="#999" size={18} />
            </TouchableOpacity>
        </View>
    );

    return (
        <>
            <Modal
                visible={visible}
                transparent={true}
                animationType="none"
                onRequestClose={onClose}
            >
                <View style={styles.overlay}>
                    <TouchableOpacity
                        style={styles.overlayTouch}
                        onPress={onClose}
                    />

                    <Animated.View
                        style={[
                            styles.modalContainer,
                            {
                                transform: [{ translateY: slideAnim }]
                            }
                        ]}
                    >
                        <SafeAreaView style={styles.safeArea}>
                            {/* Header */}
                            <View style={styles.header}>
                                <Text style={styles.headerTitle}>My Basket</Text>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={onClose}
                                >
                                    <TabBarIcon name="close" color="#333" size={24} />
                                </TouchableOpacity>
                            </View>

                            {/* Cart Items List */}
                            <View style={styles.itemsList}>
                                <FlatList
                                    data={cartItems}
                                    renderItem={renderCartItem}
                                    keyExtractor={(item, index) => `${item.sectionName}_${item.id}_${index}`}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={styles.listContent}
                                />
                            </View>

                            {/* Total and Checkout Section */}
                            <View style={styles.bottomSection}>
                                <View style={styles.totalContainer}>
                                    <View style={styles.totalRow}>
                                        <Text style={styles.subtotalLabel}>Subtotal:</Text>
                                        <Text style={styles.subtotalAmount}>${getTotalPrice()}</Text>
                                    </View>
                                    <View style={styles.totalRow}>
                                        <Text style={styles.deliveryLabel}>Delivery:</Text>
                                        <Text style={styles.deliveryAmount}>Free</Text>
                                    </View>
                                    <View style={styles.divider} />
                                    <View style={styles.totalRow}>
                                        <Text style={styles.totalLabel}>Total:</Text>
                                        <Text style={styles.totalAmount}>${getTotalPrice()}</Text>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    style={styles.checkoutButton}
                                    onPress={() => setIsCheckoutVisible(true)}
                                >
                                    <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                                    <TabBarIcon name="arrow-forward" color="#fff" size={18} />
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    </Animated.View>
                </View>
            </Modal>

            {/* Checkout Modal */}
            <CheckoutModal
                visible={isCheckoutVisible}
                onClose={() => setIsCheckoutVisible(false)}
                cartItems={cartItems}
                onOrderComplete={handleOrderComplete}
            />
        </>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    overlayTouch: {
        flex: 1,
    },
    modalContainer: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: screenHeight * 0.8,
        overflow: 'hidden',
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
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        padding: 5,
    },
    itemsList: {
        flex: 1,
        paddingTop: 10,
    },
    listContent: {
        paddingBottom: 20,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    itemImageContainer: {
        width: 60,
        height: 60,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    itemImage: {
        width: 45,
        height: 45,
    },
    itemDetails: {
        flex: 1,
        marginRight: 15,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#e53e3e',
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: 10,
    },
    quantityButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    quantityText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginHorizontal: 15,
        minWidth: 20,
        textAlign: 'center',
    },
    removeButton: {
        padding: 5,
    },
    bottomSection: {
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    totalContainer: {
        marginBottom: 20,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    subtotalLabel: {
        fontSize: 16,
        color: '#666',
    },
    subtotalAmount: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    deliveryLabel: {
        fontSize: 16,
        color: '#666',
    },
    deliveryAmount: {
        fontSize: 16,
        fontWeight: '500',
        color: '#4CAF50',
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 8,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#e53e3e',
    },
    checkoutButton: {
        backgroundColor: '#e53e3e',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 12,
        shadowColor: '#e53e3e',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    checkoutButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        marginRight: 8,
    },
});
