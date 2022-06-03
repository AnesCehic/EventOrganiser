import {createContext} from 'react';

const UserContext = createContext({
  authenticated: false,
  setAuthenticated: auth => {},
  allowMessaging: true,
  setAllowMessaging: chat => {},
  userData: {},
  setUserData: userData => {},
  deepLinkUrl: null,
  setDeepLinkUrl: url => {},
});

export default UserContext;
