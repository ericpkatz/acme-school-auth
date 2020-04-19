import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import * as ReactRouterDOM from 'react-router-dom';
import * as ReduxThunk from 'redux-thunk';
import axios from 'axios';

const { HashRouter, Route, Link } = ReactRouterDOM;
const { createStore, combineReducers, applyMiddleware } = Redux;
const { Provider, connect } = ReactRedux;
const { Component } = React;

const SET_AUTH = 'SET_AUTH';
const SET_STUDENTS = 'SET_STUDENTS';
const SET_STUDENT = 'SET_STUDENT';
const SET_SCHOOLS = 'SET_SCHOOLS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const DESTROY_STUDENT = 'DESTROY_STUDENT';

const authReducer = (state = { }, action)=> {
  switch(action.type){
    case SET_AUTH:
      return action.auth;
  }
  return state;
};

const schoolsReducer = (state = [], action)=> {
  switch(action.type){
    case SET_SCHOOLS:
      return action.schools;
  }
  return state;
};
const studentsReducer = (state = [], action)=> {
  switch(action.type){
    case SET_STUDENTS:
      return action.students;
    case CREATE_STUDENT:
      return [...state, action.student ];
    case SET_STUDENT:
      return state.map( student => student.id === action.student.id ? action.student : student);
    case DESTROY_STUDENT:
      return state.filter( student => student.id !== action.student.id );
  }
  return state;
};


const reducer = combineReducers({
  auth: authReducer,
  schools: schoolsReducer,
  students: studentsReducer
});

const setStudents = (students)=> ({ type: SET_STUDENTS, students});
const setSchools = (schools)=> ({ type: SET_SCHOOLS, schools});

const store = createStore(reducer, applyMiddleware(ReduxThunk.default));

const updateStudent = (student)=> {
  return (dispatch)=> {
    return axios.put(`/api/students/${student.id}`, student)
      .then( response => response.data)
      .then( student => dispatch({ type: SET_STUDENT, student}));
  };
};

const destroyStudent = (student)=> {
  return (dispatch)=> {
    return axios.delete(`/api/students/${student.id}`)
      .then( () => dispatch({ type: DESTROY_STUDENT, student}));
  };
};

const createStudent = (student)=> {
  return (dispatch)=> {
    return axios.post('/api/students', student)
      .then( response => response.data)
      .then( student => dispatch({ type: CREATE_STUDENT, student}));
  };
};

const loadData = ()=> {
  return (dispatch)=> {
    return Promise.all([
      axios.get('/api/students'),
      axios.get('/api/schools'),
    ])
    .then(([responseStudents, responseSchools])=> {
      dispatch(setStudents(responseStudents.data));
      dispatch(setSchools(responseSchools.data));
    });
  };
};

const login = (credentials)=> {
  return (dispatch)=> {
    console.log('attempt with', credentials);
  };
};

export default store;
export { loadData, updateStudent, createStudent, destroyStudent, login };
