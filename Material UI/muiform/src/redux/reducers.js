const initialState = {
    users: [],
    user: '',
    name: '',
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return { ...state, user: action.payload, name: '' };

        case 'SET_USERS':
            return { ...state, users: action.payload };
  
      case 'SET_NAME':
        return { ...state, name: action.payload };
  
      default:
        return state;
    }
  };
  
  export default reducer;
  