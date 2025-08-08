import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Animated
} from 'react-native';
import { TabBarIcon } from '../../components/navigation/TabBarIcon';
import BasketModal from '../../components/BasketModal';

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
    const sliderRef = useRef(null);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsWithQuantity, setCartItemsWithQuantity] = useState([]);
    const [isBasketVisible, setIsBasketVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(0)).current;

    // Function to handle plus button click (add to cart)
    const handleAddToCart = (product, sectionName) => {
        const productWithSection = { ...product, sectionName, quantity: 1 };
        const existingItemIndex = cartItemsWithQuantity.findIndex(item =>
            item.id === product.id && item.sectionName === sectionName
        );

        if (existingItemIndex !== -1) {
            // Remove from cart
            const newItems = cartItemsWithQuantity.filter((_, index) => index !== existingItemIndex);
            setCartItemsWithQuantity(newItems);
            setCartItems(newItems);

            if (newItems.length === 0) {
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }
        } else {
            // Add to cart
            const newItems = [...cartItemsWithQuantity, productWithSection];
            setCartItemsWithQuantity(newItems);
            setCartItems(newItems);

            if (cartItemsWithQuantity.length === 0) {
                Animated.timing(slideAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }
        }
    };

    // Check if product is selected
    const isProductSelected = (productId, sectionName) => {
        return cartItemsWithQuantity.some(item =>
            item.id === productId && item.sectionName === sectionName
        );
    };

    // Calculate total price
    const getTotalPrice = () => {
        return cartItemsWithQuantity.reduce((total, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return total + (price * (item.quantity || 1));
        }, 0).toFixed(2);
    };

    // Basket modal functions
    const handleUpdateQuantity = (item, change) => {
        const updatedItems = cartItemsWithQuantity.map(cartItem => {
            if (cartItem.id === item.id && cartItem.sectionName === item.sectionName) {
                const newQuantity = Math.max(1, (cartItem.quantity || 1) + change);
                return { ...cartItem, quantity: newQuantity };
            }
            return cartItem;
        });
        setCartItemsWithQuantity(updatedItems);
        setCartItems(updatedItems);
    };

    const handleRemoveItem = (item) => {
        const updatedItems = cartItemsWithQuantity.filter(cartItem =>
            !(cartItem.id === item.id && cartItem.sectionName === item.sectionName)
        );
        setCartItemsWithQuantity(updatedItems);
        setCartItems(updatedItems);

        if (updatedItems.length === 0) {
            setIsBasketVisible(false);
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

    // Promotional banner data
    const bannerData = [
        {
            id: 1,
            title: "Up to 30% offer",
            subtitle: "Enjoy our big offer",
            image: require('../../assets/images/banner1.png'),
            backgroundColor: '#FFB6C1',
        },
        {
            id: 2,
            title: "Fresh Vegetables",
            subtitle: "Farm to your table",
            image: require('../../assets/images/banner1.png'),
            backgroundColor: '#98FB98',
        },
        {
            id: 3,
            title: "Daily Essentials",
            subtitle: "Everything you need",
            image: require('../../assets/images/banner1.png'),
            backgroundColor: '#87CEEB',
        },
    ];

    // Category data
    const categories = [
        { id: 1, name: 'Fruits', image: require('../../assets/images/grapes.png') },
        { id: 2, name: 'Milk & egg', image: require('../../assets/images/milk.png') },
        { id: 3, name: 'Beverages', image: require('../../assets/images/shopping.png') },
        { id: 4, name: 'Laundry', image: require('../../assets/images/lundry.png') },
        { id: 5, name: 'Vegetables', image: require('../../assets/images/veg.png') },
    ];

    // Product data - Fruits
    const fruitsProducts = [
        {
            id: 1,
            name: 'Banana',
            price: '$3.99',
            rating: '4.8',
            reviews: '(287)',
            image: require('../../assets/images/banana.png'),
        },
        {
            id: 2,
            name: 'Apple',
            price: '$2.99',
            rating: '4.8',
            reviews: '(287)',
            image: require('../../assets/images/banana.png'),
        },
        {
            id: 3,
            name: 'Orange',
            price: '$3.99',
            rating: '4.8',
            reviews: '(287)',
            image: require('../../assets/images/banana.png'),
        },
        {
            id: 4,
            name: 'Grapes',
            price: '$4.99',
            rating: '4.9',
            reviews: '(156)',
            image: require('../../assets/images/banana.png'),
        },
    ];

    // Detergent products
    const detergentProducts = [
        {
            id: 1,
            name: 'Tide Powder',
            price: '$12.99',
            rating: '4.7',
            reviews: '(145)',
            image: require('../../assets/images/banana.png'),
        },
        {
            id: 2,
            name: 'Surf Excel',
            price: '$10.99',
            rating: '4.6',
            reviews: '(98)',
            image: require('../../assets/images/banana.png'),
        },
        {
            id: 3,
            name: 'Ariel Liquid',
            price: '$15.99',
            rating: '4.8',
            reviews: '(203)',
            image: require('../../assets/images/banana.png'),
        },
        {
            id: 4,
            name: 'Comfort Fabric',
            price: '$8.99',
            rating: '4.5',
            reviews: '(76)',
            image: require('../../assets/images/banana.png'),
        },
    ];

    // Biscuit products
    const biscuitProducts = [
        {
            id: 1,
            name: 'Oreo Cookies',
            price: '$4.99',
            rating: '4.9',
            reviews: '(512)',
            image: require('../../assets/images/banana.png'),
        },
        {
            id: 2,
            name: 'Digestive Biscuits',
            price: '$3.49',
            rating: '4.6',
            reviews: '(234)',
            image: require('../../assets/images/banana.png'),
        },
        {
            id: 3,
            name: 'Chocolate Chip',
            price: '$5.99',
            rating: '4.8',
            reviews: '(345)',
            image: require('../../assets/images/banana.png'),
        },
        {
            id: 4,
            name: 'Crackers',
            price: '$2.99',
            rating: '4.4',
            reviews: '(167)',
            image: require('../../assets/images/banana.png'),
        },
    ];

    // Juice products
    const juiceProducts = [
        {
            id: 1,
            name: 'Orange Juice',
            price: '$6.99',
            rating: '4.7',
            reviews: '(189)',
            image: require('../../assets/images/banana.png'),
        },
        {
            id: 2,
            name: 'Apple Juice',
            price: '$5.99',
            rating: '4.6',
            reviews: '(156)',
            image: require('../../assets/images/banana.png'),
        },
        {
            id: 3,
            name: 'Mixed Berry',
            price: '$7.99',
            rating: '4.8',
            reviews: '(234)',
            image: require('../../assets/images/banana.png'),
        },
        {
            id: 4,
            name: 'Grape Juice',
            price: '$6.49',
            rating: '4.5',
            reviews: '(123)',
            image: require('../../assets/images/banana.png'),
        },
    ];

    // Vegetable products
    const vegetableProducts = [
        {
            id: 1,
            name: 'Fresh Tomato',
            price: '$2.99',
            rating: '4.6',
            reviews: '(98)',
            image: require('../../assets/images/banana.png'),
        },
        {
            id: 2,
            name: 'Bell Pepper',
            price: '$3.49',
            rating: '4.7',
            reviews: '(145)',
            image: require('../../assets/images/banana.png'),
        },
        {
            id: 3,
            name: 'Fresh Spinach',
            price: '$1.99',
            rating: '4.5',
            reviews: '(87)',
            image: require('../../assets/images/banana.png'),
        },
        {
            id: 4,
            name: 'Broccoli',
            price: '$4.99',
            rating: '4.8',
            reviews: '(156)',
            image: require('../../assets/images/banana.png'),
        },
    ];

    const renderBanner = ({ item }) => (
        <View style={[styles.bannerItem, { backgroundColor: item.backgroundColor }]}>
            <View style={styles.bannerContent}>
                <Text style={styles.bannerTitle}>{item.title}</Text>
                <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
                <TouchableOpacity style={styles.shopButton}>
                    <Text style={styles.shopButtonText}>Shop Now</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bannerImageContainer}>
                <Image
                    source={item.image}
                    style={styles.bannerImage}
                    resizeMode="contain"
                />
            </View>
        </View>
    );

    const renderCategory = ({ item }) => (
        <TouchableOpacity style={styles.categoryItem}>
            <View style={styles.categoryIcon}>
                <Image
                    source={item.image}
                    style={styles.categoryImage}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.categoryName}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderProduct = ({ item, sectionName }) => {
        const isSelected = isProductSelected(item.id, sectionName);

        return (
            <View style={[
                styles.productCard,
                isSelected && styles.selectedProductCard
            ]}>
                {isSelected && <View style={styles.redSelectionBar} />}

                <View style={styles.productImageContainer}>
                    <Image
                        source={item.image}
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                    <TouchableOpacity
                        style={[
                            styles.addButton,
                            isSelected && styles.selectedAddButton
                        ]}
                        onPress={() => handleAddToCart(item, sectionName)}
                    >
                        <TabBarIcon
                            name={isSelected ? "checkmark" : "add"}
                            color={isSelected ? "#fff" : "black"}
                            size={18}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.productName}>{item.name}</Text>
                <View style={styles.ratingContainer}>
                    <TabBarIcon name="star" color="#FFD700" size={14} />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                    <Text style={styles.reviewsText}>{item.reviews}</Text>
                </View>
                <Text style={styles.productPrice}>{item.price}</Text>
            </View>
        );
    };

    const renderCartPreviewItem = ({ item, index }) => (
        <View style={styles.cartPreviewItem}>
            <Image
                source={item.image}
                style={styles.cartPreviewImage}
                resizeMode="contain"
            />
        </View>
    );

    const ProductSection = ({ title, data, sectionName }) => (
        <View style={styles.productsSection}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                renderItem={({ item }) => renderProduct({ item, sectionName })}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: cartItems.length > 0 ? 120 : 100
                }}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.addressContainer}>
                        <TabBarIcon name="location-outline" color="#666" size={20} />
                        <Text style={styles.addressText}>61 Hopper street..</Text>
                        <TabBarIcon name="chevron-down-outline" color="#666" size={20} />
                    </View>
                    <TouchableOpacity style={styles.cartButton}>
                        <TabBarIcon name="bag-outline" color="#333" size={24} />
                        {cartItems.length > 0 && (
                            <View style={styles.cartBadge}>
                                <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Promotional Banner Slider */}
                <View style={styles.bannerSection}>
                    <FlatList
                        ref={sliderRef}
                        data={bannerData}
                        renderItem={renderBanner}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        snapToInterval={screenWidth - 40}
                        decelerationRate="fast"
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                    />
                </View>

                {/* Categories Section */}
                <View style={styles.categoriesSection}>
                    <FlatList
                        data={categories}
                        renderItem={renderCategory}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                    />
                </View>

                {/* Product Sections */}
                <ProductSection title="Fruits" data={fruitsProducts} sectionName="fruits" />
                <ProductSection title="Detergent" data={detergentProducts} sectionName="detergent" />
                <ProductSection title="Biscuit" data={biscuitProducts} sectionName="biscuit" />
                <ProductSection title="Juices" data={juiceProducts} sectionName="juices" />
                <ProductSection title="Vegetables" data={vegetableProducts} sectionName="vegetables" />
            </ScrollView>

            {/* Floating Basket Bar */}
            {cartItems.length > 0 && (
                <Animated.View
                    style={[
                        styles.floatingBasketBar,
                        {
                            transform: [{
                                translateY: slideAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [100, 0]
                                })
                            }]
                        }
                    ]}
                >
                    <View style={styles.basketBarContent}>
                        {/* Left side - Product preview images */}
                        <View style={styles.basketPreview}>
                            <FlatList
                                data={cartItems.slice(0, 3)}
                                renderItem={renderCartPreviewItem}
                                keyExtractor={(item, index) => `${item.sectionName}_${item.id}_${index}`}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.previewList}
                            />
                            {cartItems.length > 3 && (
                                <View style={styles.moreItemsIndicator}>
                                    <Text style={styles.moreItemsText}>+{cartItems.length - 3}</Text>
                                </View>
                            )}
                        </View>

                        {/* Center - Items count and total */}
                        <View style={styles.basketInfo}>
                            <Text style={styles.itemCount}>{cartItems.length} items</Text>
                            <Text style={styles.totalPrice}>${getTotalPrice()}</Text>
                        </View>

                        {/* Right side - View Basket button */}
                        <TouchableOpacity
                            style={styles.viewBasketButton}
                            onPress={() => setIsBasketVisible(true)}
                        >
                            <Text style={styles.viewBasketText}>View Basket</Text>
                            <TabBarIcon name="chevron-forward" color="#fff" size={16} />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}

            {/* Basket Modal */}
            <BasketModal
                visible={isBasketVisible}
                onClose={() => setIsBasketVisible(false)}
                cartItems={cartItemsWithQuantity}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollContainer: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addressText: {
        fontSize: 16,
        color: '#333',
        marginHorizontal: 8,
        fontWeight: '500',
    },
    cartButton: {
        padding: 8,
        position: 'relative',
    },
    cartBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#e53e3e',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartBadgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },

    // Banner Styles
    bannerSection: {
        marginBottom: 30,
    },
    bannerItem: {
        width: screenWidth - 40,
        height: 150,
        borderRadius: 15,
        marginHorizontal: 5,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bannerContent: {
        flex: 1,
    },
    bannerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    bannerSubtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 15,
    },
    shopButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    shopButtonText: {
        color: '#333',
        fontWeight: '600',
    },
    bannerImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
    },
    bannerImage: {
        width: 140,
        height: 130,
    },

    // Categories Styles
    categoriesSection: {
        marginBottom: 30,
    },
    categoryItem: {
        alignItems: 'center',
        marginHorizontal: 10,
        width: 80,
    },
    categoryIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    categoryImage: {
        width: 40,
        height: 40,
    },
    categoryName: {
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
        fontWeight: '500',
    },

    // Products Styles
    productsSection: {
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    seeAllText: {
        fontSize: 16,
        color: '#e53e3e',
        fontWeight: '500',
    },

    // Product Card Design
    productCard: {
        width: 160,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 12,
        marginHorizontal: 8,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        position: 'relative',
        overflow: 'hidden',
    },
    selectedProductCard: {
        borderColor: '#e53e3e',
        borderWidth: 1,
        shadowColor: '#e53e3e',
        shadowOpacity: 0.3,
        elevation: 6,
    },
    redSelectionBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 6,
        backgroundColor: '#e53e3e',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        zIndex: 1,
    },
    productImageContainer: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        position: 'relative',
        backgroundColor: '#fafafa',
        borderRadius: 8,
        marginTop: 8,
    },
    productImage: {
        width: 80,
        height: 80,
    },
    addButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#f7f7f7ff',
        borderRadius: 20,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#aca6a6ff',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    selectedAddButton: {
        backgroundColor: '#e53e3e',
        shadowColor: '#e53e3e',
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
        textAlign: 'left',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginLeft: 4,
    },
    reviewsText: {
        fontSize: 12,
        color: '#999',
        marginLeft: 4,
    },
    productPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'left',
    },

    // Floating Basket Bar Styles
    floatingBasketBar: {
        position: 'absolute',
        bottom: 85, // Above tab bar
        left: 16,
        right: 16,
        backgroundColor: '#e53e3e',
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 12,
    },
    basketBarContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    basketPreview: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    previewList: {
        paddingRight: 8,
    },
    cartPreviewItem: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 8,
        marginRight: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    cartPreviewImage: {
        width: 32,
        height: 32,
    },
    moreItemsIndicator: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
    },
    moreItemsText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    basketInfo: {
        alignItems: 'center',
        marginHorizontal: 16,
    },
    itemCount: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
        opacity: 0.9,
    },
    totalPrice: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    viewBasketButton: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    viewBasketText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginRight: 6,
    },
});
