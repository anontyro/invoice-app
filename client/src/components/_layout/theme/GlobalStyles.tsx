import { css, Global } from '@emotion/react';
import CustomTheme from './interface/CustomTheme';

const createStyles = (theme: CustomTheme) => {
  return css`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
    html,
    body {
      height: 100%;
      position: relative;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Roboto', sans-serif;
      font-weight: 200;
    }
  `;
};

interface Props {
  theme: CustomTheme;
}

const GlobalStyles: React.FC<Props> = ({ theme }) => {
  return <Global styles={createStyles(theme)} />;
};

export default GlobalStyles;
