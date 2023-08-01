import { createContext, useContext, useReducer, useMemo } from 'react';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// The  main context
const SoftUI = createContext(null);

// Setting custom name for the context which is visible on react dev tools
export const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  register: () => {},
  logout: () => {}
});
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

SoftUI.displayName = 'SoftUIContext';

// React reducer
function reducer(state, action) {
  switch (action.type) {
    case 'MINI_SIDENAV': {
      return { ...state, miniSidenav: action.value };
    }
    case 'LAYOUT': {
      return { ...state, layout: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// React context provider
function SoftUIControllerProvider({ children }) {
  const initialState = {
    miniSidenav: false,
    layout: 'auth'
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <SoftUI.Provider value={value}>{children}</SoftUI.Provider>;
}

// React custom hook for using context
function useSoftUIController() {
  const context = useContext(SoftUI);

  if (!context) {
    throw new Error(
      'useSoftUIController should be used inside the SoftUIControllerProvider.'
    );
  }

  return context;
}

// Typechecking props for the SoftUIControllerProvider
SoftUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Context module functions
const setMiniSidenav = (dispatch, value) =>
  dispatch({ type: 'MINI_SIDENAV', value });
const setLayout = (dispatch, value) => dispatch({ type: 'LAYOUT', value });

export {
  SoftUIControllerProvider,
  useSoftUIController,
  setMiniSidenav,
  setLayout
};
