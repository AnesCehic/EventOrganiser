import {createContext} from 'react';

const UserContext = createContext({
  authenticated: false,
  setAuthenticated: auth => {},
  allowMessaging: false,
  setAllowMessaging: chat => {},
  userData: {},
  setUserData: userData => {},
});

export default UserContext;
