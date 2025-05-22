import { MobileLayout } from '@/src/components/layout/MobileLayout';
import { NonMobileLayout } from '@/src/components/layout/NonMobileLayout';
import { IconSymbolName } from '@/src/components/ui/IconSymbol';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import { ColorSchemeName, useWindowDimensions } from 'react-native';


export interface TabData {
  name: string;
  title: string;
  icon: IconSymbolName;
}


export interface RootLayoutProps {
  colorScheme: ColorSchemeName;
  isMobile: boolean;
  width: number;
  visibleTabs: TabData[];
}

export const ALL_TABS: TabData[] = [
  {
    name: 'home',
    title: 'Home',
    icon: 'house.fill',
  },
  {
    name: 'debug',
    title: 'Debug',
    icon: 'photo.fill',
  },
] as const;


export const TabLayout = () => {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const isMobile = width < 600;

  const getVisibleTabs = () => {
    if (width < 400) {
      return ALL_TABS.slice(0, 3);
    }
    if (width < 600) {
      return ALL_TABS.slice(0, 4);
    }
    return ALL_TABS;
  };

  const visibleTabs = getVisibleTabs();

  console.log('isMobile', isMobile);

  const layoutProps: RootLayoutProps = {
    colorScheme,
    isMobile,
    width,
    visibleTabs,
  }

  if (isMobile) {
    return (
      <MobileLayout
        {...layoutProps}
      />
    )
  }

  return (
    <NonMobileLayout {...layoutProps} />
  );
}

export default TabLayout;
