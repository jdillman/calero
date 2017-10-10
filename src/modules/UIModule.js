// Constants
export const UI_READY = 'ui:ready';

// Actions
export function appStart() {
  return { type: UI_READY };
}

// Reducer
export const initialState = {
  ready: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UI_READY:
      return { ...state, ready: true };
    default:
  }
  return state;
}
