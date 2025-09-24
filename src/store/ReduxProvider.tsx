"use client"


import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from 'next-auth/react';
import { AppLoader } from '../components/ui/loader';
import { store, persistor } from './store';



/**
 * Redux Provider Component
 * Wraps the entire app with Redux store and persistence
 * 
 * Usage:
 * Wrap your app or specific components with this provider
 * to enable Redux state management and persistence
 */

export const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<AppLoader />} persistor={persistor}>
          {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider
