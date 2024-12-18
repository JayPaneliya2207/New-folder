const initialState = {
    siteName: 'Default Site',
    // other settings...
  };
  
  export const frontendReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_FRONTEND_SETTINGS':
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };
  