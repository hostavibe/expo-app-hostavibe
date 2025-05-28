import { IconSymbolName } from '@/src/components/ui/IconSymbol';
import { ColorSchemeName } from 'react-native';

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
    name: 'my/posts',
    title: 'My Posts',
    icon: 'photo.fill',
  },
  {
    name: 'my/boards',
    title: 'My Boards',
    icon: 'display',
  },
  {
    name: 'org',
    title: 'My Orgs',
    icon: 'building.2.fill',
  },
  // {
  //   name: 'debug',
  //   title: 'Debug',
  //   icon: 'photo.fill',
  // },
  // {
  //   name: 'profile',
  //   title: 'Profile',
  //   icon: 'person.fill',
  // },
] as const;



export const HIDDEN_TAB_TITLES = [
  'index',
  // 'board-setups',
  // 'menu',
  // 'org',
  'boards',
  'debug',
]