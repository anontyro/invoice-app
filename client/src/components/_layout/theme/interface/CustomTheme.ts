export interface CustomThemeData {
  light: CustomTheme;
  dark: CustomTheme;
}

interface CustomTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    background: string;
    textPrimary: string;
    textSecondary: string;
    button: {
      background: string;
      text: string;
      border: string;
    };
    buttonSecondary: {
      background: string;
      text: string;
      border: string;
    };
    link: {
      text: string;
      hover: string;
    };
    card: {
      background: string;
      text: string;
      textMuted: string;
      textSecondary: string;
    };
  };
}

export default CustomTheme;
