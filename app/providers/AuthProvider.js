import React, { useContext, useState, useEffect, useRef } from 'react';
import Realm from 'realm';

import app from '../../realmApp';
import authStorage from '../auth/storage';
import { farmSchema, headSchema, userSchema } from '../schemas';

// Create a new Context object that will be provided to descendants of
// the AuthProvider.
const AuthContext = React.createContext(null);

// The AuthProvider is responsible for user management and provides the
// AuthContext value to its descendants. Components under an AuthProvider can
// use the useAuth() hook to access the auth value.
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(app.currentUser);
  const realmRef = useRef(null);
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    if (!user) {
      console.log('========== inside return no user');
      return;
    }

    // The current user always has their own project, so we don't need
    // to wait for the user object to load before displaying that project.
    const myProject = { name: 'My Project', partition: `project=${user.id}` };
    setProjectData([myProject]);

    const config = {
      sync: {
        user,
        partitionValue: `user=${user.id}`,
        schema: [userSchema, farmSchema, userSchema, headSchema],
      },
    };

    // Open a realm with the logged in user's partition value in order
    // to get the projects that the logged in user is a member of
    Realm.open(config).then((userRealm) => {
      console.log('====================================');
      console.log(' userRealm', userRealm);
      console.log('====================================');
      realmRef.current = userRealm;
      const users = userRealm.objects('users');

      users.addListener(() => {
        // The user custom data object may not have been loaded on
        // the server side yet when a user is first registered.
        if (users.length === 0) {
          setProjectData([myProject]);
        } else {
          const { memberOf } = users[0];
          setProjectData([...memberOf]);
        }
      });
    });

    return () => {
      // cleanup function
      console.log('============ inside close');
      const userRealm = realmRef.current;
      if (userRealm) {
        userRealm.close();
        realmRef.current = null;
        setProjectData([]); // set project data to an empty array (this prevents the array from staying in state on logout)
      }
    };
  }, [user]);

  // The signIn function takes an email and password and uses the
  // emailPassword authentication provider to log in.
  const signIn = async (email, password) => {
    const creds = Realm.Credentials.emailPassword(email, password);
    const newUser = await app.logIn(creds);
    console.log('====================================');
    console.log('creds', creds);
    console.log('newUser', newUser);
    console.log('====================================');
    await authStorage.setUserInStorage(newUser);
    setUser(newUser);
  };

  // The signUp function takes an email and password and uses the
  // emailPassword authentication provider to register the user.
  const signUp = async (email, password) => {
    await app.emailPasswordAuth.registerUser(email, password);
  };

  // The signOut function calls the logOut function on the currently
  // logged in user
  const signOut = async () => {
    if (user == null) {
      console.warn("Not logged in, can't log out!");
      return;
    }
    user.logOut();
    await authStorage.removeUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        setUser,
        user,
        projectData, // list of projects the user is a memberOf
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// The useAuth hook can be used by components under an AuthProvider to
// access the auth context value.
const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error('useAuth() called outside of a AuthProvider?');
  }
  return auth;
};

export { AuthProvider, useAuth };
