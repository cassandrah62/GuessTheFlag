
import React from "react";
import PropTypes from "prop-types";


// Set up global contexts
export const GlobalStateContext = React.createContext();
export const GlobalDispatchContext = React.createContext();
// Actions
export const SET_CART_ITEMS = "SET_CART_ITEMS";
// Reducer
export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CART_ITEMS: {
      return {
        ...state,
        cart: payload
      };
    }
    // Add more here!
    default:
      return state;
  }
};
function GlobalState(props) {
  const { initialState, dispatch } = props;
  return (
    <GlobalStateContext.Provider value={initialState}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {props.children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
}
GlobalState.propTypes = {
  // The state returned from setting up the reducer using the React Hook `useReducer`.
  initialState: PropTypes.object.isRequired,
  // The dispatch function returned from setting up the reducer using the React Hook `useReducer`.
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.node
};
export default GlobalState;





// import React from 'react';
// import TriviaGame from '../../flagTrivia/trivia_game.js';
// import { useState, useEffect } from 'react';
// import {store, useGlobalState} from 'state-pool';

// const globalState = {
//     questions: 0,
//   };
  
//   const globalStateContext = React.createContext(globalState);
//   const dispatchStateContext = React.createContext(undefined);
  
//   const GlobalStateProvider = ({ children }) => {
//     const [state, dispatch] = React.useReducer(
//       (state, newValue) => ({ ...state, ...newValue }),
//       defaultGlobalState
//       );
  
//       return (
//         <globalStateContext.Provider value={state}>
//           <dispatchStateContext.Provider value={dispatch}>
//             {children}
//           </dispatchStateContext.Provider>
//         </globalStateContext.Provider>
//       );
//     };
  
//     const Counter = () => {
//       const [state, dispatch] = useGlobalState();
//       return (
//         <button onClick={() => dispatch({ num: state.num + 1 })}>
//           {state.num}
//         </button>
//       );
//     };
  
