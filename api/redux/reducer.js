import * as actionTypes from "./actionTypes";

let initialState = [];
let lastId = 0;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_STATE: {
      return [...action.payload.state];
    }
    case actionTypes.CREATE_SESSION: {
      return [
        ...state,
        {
          id: ++lastId,
          title: action.payload.title,
          photos: [],
        },
      ];
    }
    case actionTypes.DELETE_SESSION: {
      return state.filter((session) => session.id != action.payload.id);
    }

    case actionTypes.DELETE_ALL_SESSIONS: {
      lastId = 0;
      return [];
    }

    case actionTypes.ADD_PHOTO_TO_SESSION: {
      const editedState = state.map((session) =>
        session.id != action.payload.id
          ? session
          : {
              id: session.id,
              title: session.title,
              photos: [
                ...session.photos,
                { ...action.payload.photo },
              ],
            }
      );
      return editedState;
    }

    default:
      return state;
  }
};

export default reducer;
