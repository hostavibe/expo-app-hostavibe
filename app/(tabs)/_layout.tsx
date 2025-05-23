import { MobileLayout } from '@/src/components/layout/MobileLayout';
import { NonMobileLayout } from '@/src/components/layout/NonMobileLayout';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import { ALL_TABS, RootLayoutProps } from '@/src/types/layout';
import { useWindowDimensions } from 'react-native';

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
