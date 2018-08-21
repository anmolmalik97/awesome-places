import * as actionTypes from "../actions/actionTypes";

const initialState = {
  places: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REMOVE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.key;
        })
    };
    case actionTypes.SET_PLACES:
      return{
        ...state,
        places: action.places
      }

    default:
      return state;
  }
};

export default reducer;
