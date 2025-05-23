import { IconSymbol } from "@/src/components/ui/IconSymbol";
import TabBarBackground from "@/src/components/ui/TabBarBackground";
import { Colors } from "@/src/constants/Colors";
import { ALL_TABS, RootLayoutProps } from "@/src/types/layout";
import { Tabs } from "expo-router";
import { Platform, ViewStyle } from "react-native";


export const MobileLayout = (props: RootLayoutProps) => {
  const { colorScheme, isMobile } = props;

  const hiddenTabTitles = [
    'index',
    'board-setups',
    // 'active-boards',
    'menu',
  ]

  const tabBarStyle: ViewStyle = Platform.OS === 'ios' 
  ? { 
      position: 'absolute',
      height: 85,
      paddingBottom: 20,
    } 
  : {
      height: 65,
      paddingBottom: 10,
    };

  const visibleTabs = ALL_TABS
    .filter((tab) => !hiddenTabTitles.includes(tab.name as string))
    .filter((tab) => tab.name !== 'board-setups');

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        // tabBarButton: isMobile ? HapticTab : undefined,
        // tabBarButton: () => null,
        tabBarBackground: isMobile ? TabBarBackground : undefined,
        tabBarStyle,
        tabBarPosition: isMobile ? 'bottom' : 'top',
        tabBarLabelStyle: {
          fontSize: isMobile ? 12 : 14,
          fontWeight: isMobile ? '500' : '600',
        },
      }}
    >
      {
        hiddenTabTitles.map((tab) => (
          <Tabs.Screen
            key={tab}
            name={tab}
            options={{
              href: null,
            }}
          />
        ))
      }

      {visibleTabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={({ navigation }) => ({
            title: tab.title,
            tabBarLabel: tab.title,
            tabBarIcon: ({ color }) => (
              <IconSymbol size={isMobile ? 28 : 24} name={tab.icon} color={color} />
            ),
            tabBarOnPress: () => {
              navigation.navigate(tab.name);
            },
          })}
        />
      ))}

      {/* <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarLabel: 'Menu',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={isMobile ? 28 : 24}
              name="line.3.horizontal"
              color={color} 
            />
          ),
          tabBarButton: MenuTabButton,
        }}
      /> */}
    </Tabs>
  );
}