import { useEffect } from 'react';
import { useState } from 'react';
import {
  CURRENT_THEME_KEY,
  getAllThemes,
  getLocalStorage,
  setLocalStorage,
} from '../../../utils/localStorage';
import CustomTheme from './interface/CustomTheme';

const useTheme = () => {
  const themes = getAllThemes();
  const [theme, setTheme] = useState<CustomTheme>(themes.light);
  const [themeLoaded, setThemeLoaded] = useState(false);

  const setMode = (mode: CustomTheme) => {
    setLocalStorage(CURRENT_THEME_KEY, mode);
    setTheme(mode);
  };

  useEffect(() => {
    const localTheme = getLocalStorage<CustomTheme>(CURRENT_THEME_KEY);
    localTheme ? setTheme(localTheme) : setTheme(themes.light);

    setThemeLoaded(true);
  }, []);

  return {
    theme,
    themes,
    setTheme,
    themeLoaded,
    setMode,
  };
};

export default useTheme;
