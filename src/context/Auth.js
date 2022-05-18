import React, { useEffect, useState } from 'react';
import { firebaseApp as app } from '../firebase/init';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Loader } from '../common/loader/Loader';

export const AuthContext = React.createContext();

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email || 'guest@pro-organisers.web.app',
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  const authStateChanged = (authState) => {
    if (!authState) {
      setCurrentUser(null);
      setPending(false);
      return;
    }

    setPending(true);
    const user = formatAuthUser(authState);
    setCurrentUser(user);
    setPending(false);
  };

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  if (pending) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
