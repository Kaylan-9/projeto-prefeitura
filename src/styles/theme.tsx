export interface ThemeProps {
  colors?: {
    primary: string,
    secondary: string,
    tertiary: string,
    quaternary: string
  }
};

const theme: {
  [key: string]: ThemeProps
} = {
  dark: {
    colors: {
      primary: '#1b1c24',
      secondary: 'rgb(34 34 43)',
      tertiary: 'white',
      quaternary: '#bfbfbf'
    }
  },
  light: {
    colors: {
      primary: '#a9acb5',
      secondary: '#ffffff',
      tertiary: 'black',
      quaternary: 'rgb(64 64 64)'
    }
  }
};

export default theme;