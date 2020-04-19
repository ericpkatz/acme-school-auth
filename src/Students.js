import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import * as ReactRouterDOM from 'react-router-dom';
import * as ReduxThunk from 'redux-thunk';
import axios from 'axios';
import { schoolMap } from './utils';
import StudentTile from './common/StudentTile';

const { HashRouter, Route, Link } = ReactRouterDOM;
const { Provider, connect } = ReactRedux;

const _Students = ({ students, schoolMap })=> {
  return (
    <div className='tiles'>
      {
        students.map( student => {
          return (
            <StudentTile key={ student.id } student={ student } schoolMap={ schoolMap } />
          );
        })
      }
    </div>
  );
}

export default connect(( state ) => {
  return {
    ...state, schoolMap: schoolMap(state)
  };
})(_Students);
