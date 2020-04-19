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
import StudentDropDown from './common/StudentDropDown';
import StudentTile from './common/StudentTile';


const _School = ({ school, students })=> {
  if(!school.id){
    return null;
  }
  return (
    <div>
      <h2>{ school.name } ({ students.length} Students enrolled)</h2>
      <StudentDropDown excluded={ students } school={ school }/>
      <div className='tiles'>
        {
          students.map( student => <StudentTile key={ student.id } schoolMap={{[school.id]: school } } student={ student }/>)
        }
      </div>
    </div>
  );
};

export default connect(( state, { match })=> {
  const school = state.schools.find( school => school.id === match.params.id) || {};
  const students = state.students.filter( student => student.schoolId === match.params.id);
  return {
    school,
    students
  };
})(_School)

