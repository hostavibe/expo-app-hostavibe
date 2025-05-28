import { HapticTab } from "@/src/components/HapticTab";
import { IconSymbol } from "@/src/components/ui/IconSymbol";
import TabBarBackground from "@/src/components/ui/TabBarBackground";
import { Colors } from "@/src/constants/Colors";
import { HIDDEN_TAB_TITLES, RootLayoutProps } from "@/src/types/layout";
import { Tabs } from "expo-router";
import { ViewStyle } from "react-native";

export const NonMobileLayout = (props: RootLayoutProps) => {
  const { colorScheme, isMobile, visibleTabs } = props;


  const tabBarStyle: ViewStyle = {
    position: 'relative',
    borderTopWidth: 0,
    elevation: 0,
    height: 60,
  };

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: isMobile ? HapticTab : undefined,
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
        HIDDEN_TAB_TITLES.map((tab) => (
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
          options={{
            title: tab.title,
            tabBarLabel: tab.title,
            tabBarIcon: ({ color }) => (
              <IconSymbol size={isMobile ? 28 : 24} name={tab.icon} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
