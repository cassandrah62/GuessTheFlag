import React from "react";
import PropTypes from "prop-types";

// Set up global contexts
export const GlobalStateContext = React.createContext();
export const GlobalDispatchContext = React.createContext();
// Actions
export const SET_CART_ITEMS = "SET_CART_ITEMS";
// Reducer
export const reducer = (state, action) =>
{
  const { type, payload } = action;
  switch (type) 
  {
    case SET_CART_ITEMS: 
    {
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
function GlobalState(props) 
{
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


  
