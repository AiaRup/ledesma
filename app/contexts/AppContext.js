import { createContext, useContext } from 'react';

const AppContext = createContext();

const useApp = () => {
  const app = useContext(AppContext);
  if (app == null) {
    throw new Error('useApp() called outside of a AppProvider?');
  }
  return { user: app.user, setUser: app.setUser };
};

export { AppContext, useApp };
