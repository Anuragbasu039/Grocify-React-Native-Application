import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { TabBarIcon } from '../../components/navigation/TabBarIcon';
import { useRouter, usePathname } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');

function CustomTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  // Hide tab bar on splash screen (improved condition)
  if (pathname === '/' || pathname === '/(tabs)' || pathname === '/(tabs)/' || pathname.endsWith('index')) {
    return null;
  }

  const tabs = [
    { name: 'home', title: 'Home', icon: 'home', iconOutline: 'home-outline' },
    { name: 'favourite', title: 'Favourite', icon: 'heart', iconOutline: 'heart-outline' },
    { name: 'search', title: 'Search', icon: 'search', iconOutline: 'search-outline' },
    { name: 'profile', title: 'Profile', icon: 'person', iconOutline: 'person-outline' },
    { name: 'menu', title: 'Menu', icon: 'menu', iconOutline: 'menu-outline' },
  ];

  return (
    <View style={styles.customTabBar}>
      {tabs.map((tab, index) => {
        const isActive = pathname.includes(tab.name);
        return (
          <TouchableOpacity
            key={index}
            style={styles.tabItem}
            onPress={() => router.push(`/(tabs)/${tab.name}`)}
          >
            <TabBarIcon
              name={isActive ? tab.icon : tab.iconOutline}
              color={isActive ? '#e53e3e' : '#999999'}
              size={24}
            />
            <Text style={[styles.tabLabel, { color: isActive ? '#e53e3e' : '#999999' }]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar />}
      screenOptions={{
        headerShown: false,
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Splash',
          href: null, // This also helps hide the tab
        }}
      />
      <Tabs.Screen name="home" />
      <Tabs.Screen name="favourite" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="menu" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  customTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 0.5,
    borderTopColor: '#e0e0e0',
    height: 85,
    width: screenWidth,
    paddingBottom: 20,
    paddingTop: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tabItem: {
    flex: 1,
    width: screenWidth / 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
});
