import {extendTheme} from 'native-base';

export const theme = extendTheme({
  fontConfig: {
    Raleway: {
      100: {
        normal: 'Raleway-Light',
        italic: 'Raleway-LightItalic',
      },
      200: {
        normal: 'Raleway-Light',
        italic: 'Raleway-LightItalic',
      },
      300: {
        normal: 'Raleway-Light',
        italic: 'Raleway-LightItalic',
      },
      400: {
        normal: 'Raleway-Regular',
        italic: 'Raleway-Italic',
      },
      500: {
        normal: 'Raleway-Medium',
      },
      600: {
        normal: 'Raleway-Medium',
        italic: 'Raleway-MediumItalic',
      },
      700: {
        normal: 'Raleway-Bold',
      },
      800: {
        normal: 'Raleway-Bold',
        italic: 'Raleway-BoldItalic',
      },
      900: {
        normal: 'Raleway-Bold',
        italic: 'Raleway-BoldItalic',
      },
    },
    Lato: {
      100: {
        normal: 'Lato-Light',
        italic: 'Lato-LightItalic',
      },
      200: {
        normal: 'Lato-Light',
        italic: 'Lato-LightItalic',
      },
      300: {
        normal: 'Lato-Light',
        italic: 'Lato-LightItalic',
      },
      400: {
        normal: 'Lato-Regular',
        italic: 'Lato-Italic',
      },
      500: {
        normal: 'Lato-Medium',
      },
      600: {
        normal: 'Lato-Medium',
        italic: 'Lato-MediumItalic',
      },
      700: {
        normal: 'Lato-Bold',
      },
      800: {
        normal: 'Lato-Bold',
        italic: 'Lato-BoldItalic',
      },
      900: {
        normal: 'Lato-Bold',
        italic: 'Lato-BoldItalic',
      },
    },
  },
  fonts: {
    heading: 'Raleway',
    body: 'Lato',
    mono: 'Lato',
  },
  colors: {
    // Add new color
    brand: {
      50: '#e9e9ff',
      100: '#c6c8ff',
      200: '#7d84e5',
      300: '#7d84e5',
      400: '#6468d8',
      500: '#6468d8',
      600: '#4743c0',
      700: '#3e39b4',
      800: '#372ea7',
      900: '#2c1990',
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
        size: 'lg',
      },
    },
    Input: {
      baseStyle: {},
      defaultProps: {
        borderColor: 'gray.300',
        _focus: {
          borderColor: '#6468d8',
        },
      },
      variants: {},
      sizes: {},
    },
  },
});
