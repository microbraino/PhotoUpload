import * as actionTypes from './actionTypes';

const initState = (state) => ({
  type: actionTypes.INIT_STATE,
  payload: {
    state: state,
  },
});

const createSession = title => ({
  type: actionTypes.CREATE_SESSION,
  payload: {
    title: title,
  },
});

const deleteSession = id => ({
  type: actionTypes.DELETE_SESSION,
  payload: {
    id: id,
  },
});

const deleteAllSessions = () => ({
  type: actionTypes.DELETE_ALL_SESSIONS,
  payload: {},
});

const addPhotoToSession = (sessionId, photo) => ({
  type: actionTypes.ADD_PHOTO_TO_SESSION,
  payload: {
    id: sessionId,
    photo,
  },
});

const deletePhotoFromSession = (sessionId, photoId) => ({
  type: actionTypes.DELETE_PHOTO_FROM_SESSION,
  payload: {
    sessionId,
    photoId
  },
});


export {
  initState,
  createSession,
  deleteSession,
  deleteAllSessions,
  addPhotoToSession,
  deletePhotoFromSession
};
