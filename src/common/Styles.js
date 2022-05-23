import {Appearance} from 'react-native';
const colorScheme = Appearance.getColorScheme();

const Styles = {
  Colors: {
    white: '#fff',
    black: '#000',
    gray: '#C4C4C4',
    lightGrayBg: '#F8FAFD',
    darkGrayBg: '#E5E5E5',
    success: '#12D125',
    error: '#ff0f0f',
    pinkFuschia: '#F178B6',
    primaryBlue: '#007FFF',
    primaryText: '#1D232E',
    grayText: '#747688',
    lightGrayText: '#A7B0C0',
    darkGrayText: '#0A121A',
    secondaryPink: '#F19BFF',
    textInputGrayBg: '#F5F6F7',
    grayBorder: colorScheme === 'dark' ? '#32343A' : '#E7ECF3',
    gold: '#BFBB85',
    grayButtonBackground: '#2D2B0D',
    grayBorderPost: '#E7E7E7',
    addPhotoBorder: '#E6EBF0',
    delete: '#FE3B30',

    topBackground: colorScheme === 'dark' ? '#fff' : '#BFBB85',
    headerBackground: colorScheme === 'dark' ? '#273038' : '#BFBB85',
    createPostButton: colorScheme === 'dark' ? '#BFBB85' : '#fff',
    darkBgLight: colorScheme === 'dark' ? '#1C2329' : '#fff',
    darkBgGold: colorScheme === 'dark' ? '#1C2329' : '#BFBB85',
    darkBgLight2: colorScheme === 'dark' ? '#4C5761' : '#fff',
    purple: '#684BA6',
    iconGray: colorScheme === 'dark' ? 'gray' : '#fff',
  },
  Fonts: {
    header: 'IBMPlexSerif-Light',
    headerMedium: 'IBMPlexSerif-Medium',
    headerBold: 'IBMPlexSerif-Bold',
  },
  Sizes: {
    avatar: 140,
    avatarMedium: 60,
    avatarSmall: 32,
  },
  Shadows: {
    textBox: {
      elevation: 3,
      shadowColor: 'rgba(0,0,0,0.2)',
      shadowOffset: {width: -2, height: 4},
      shadowRadius: 3,
    },
  },
};

export default Styles;
