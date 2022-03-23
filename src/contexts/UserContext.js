import {createContext} from 'react';

const UserContext = createContext({
  authenticated: false,
  setAuthenticated: auth => {},
  allowMessaging: false,
  setAllowMessaging: chat => {},
  userData: {},
  setUserData: userData => {},
  darkMode: false,
  setDarkMode: darkMode => {},
});

export default UserContext;
