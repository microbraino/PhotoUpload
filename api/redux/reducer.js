import * as actionTypes from "./actionTypes";

const initialState = [];
let lastId = 0;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_SESSIONS: {
      return state;
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

    case actionTypes.EDIT_SESSION: {
      const act = action.payload.updated;
      const updated = { ...act };
      editedState = state.map((session) =>
        session.id != action.payload.id ? session : { ...session, ...updated }
      );
      return;
    }

    default:
      return state;
  }
};

export default reducer;
