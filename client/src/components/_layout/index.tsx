import styled from '@emotion/styled';
import { ReactNode, useEffect, useState } from 'react';
import { CURRENT_THEME_KEY, getLocalStorage } from '../../utils/localStorage';
import GlobalStyles from './theme/GlobalStyles';
import CustomTheme from './theme/interface/CustomTheme';
import useTheme from './theme/useTheme';

const MainContent = styled.div`
  height: 100%;
  width: 70%;
  margin: 5rem auto;
`;

interface Props {
  children: ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  const { theme, themes, themeLoaded, setMode } = useTheme();

  const [selectedTheme, setSelectedTheme] = useState<CustomTheme>(theme);
  useEffect(() => {
    setSelectedTheme(theme);
  }, [theme, themeLoaded]);

  const setToggleTheme = () => {
    const currentTheme = getLocalStorage<CustomTheme>(CURRENT_THEME_KEY);
    const nextTheme =
      currentTheme.name === 'light' ? themes.dark : themes.light;
    setMode(nextTheme);
    setSelectedTheme(nextTheme);
  };

  return (
    <>
      {themeLoaded && (
        <>
          <GlobalStyles theme={selectedTheme} />
          <MainContent>{children}</MainContent>
        </>
      )}
    </>
  );
};

export default MainLayout;
