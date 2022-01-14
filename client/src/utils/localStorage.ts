import themes from '../assets/data/themes.json';
import { CustomThemeData } from '../components/_layout/theme/interface/CustomTheme';
export const ALL_THEME_KEY = 'all-themes';
export const CURRENT_THEME_KEY = 'theme';

export const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = <T>(key: string): T => {
  return JSON.parse(localStorage.getItem(key) || 'null');
};

export const getAllThemes = (): CustomThemeData => {
  const currentThemes = getLocalStorage<CustomThemeData>(ALL_THEME_KEY);
  if (!currentThemes) {
    setLocalStorage(ALL_THEME_KEY, themes.data);
    return themes.data;
  }
  return currentThemes;
};
