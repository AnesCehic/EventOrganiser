import {createContext} from 'react';

const UserContext = createContext({
  authenticated: false,
  setAuthenticated: auth => {},
  chatForbiden: false,
  setChatForbiden: chat => {},
  userData: {},
  setUserData: userData => {},
});

export default UserContext;
