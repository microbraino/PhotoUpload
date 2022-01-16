import * as actionTypes from './actionTypes';

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

const getAllSessions = () => ({
  type: actionTypes.GET_ALL_SESSIONS,
});

const editSessions = (id, updated) => ({
  type: actionTypes.GET_ALL_SESSIONS,
  payload: {
    id: id,
    updated: {...updated},
  },
});

export {
  createSession,
  deleteSession,
  getAllSessions,
  editSessions,
  deleteAllSessions,
};
