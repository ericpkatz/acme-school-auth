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
import store, { loadData } from './store';
import { topSchool, mostPopular } from './utils';

const _Nav = ({ schools, students, mostPopular, topSchool, location: {pathname}, match })=> {
  return (
    <header>
      <Link to='/'>Acme Schools</Link>
      <nav>
        <Link to='/schools' className={ pathname.startsWith('/schools') ? 'selected': ''}>Schools ({ schools.length })</Link>
        <Link to='/students' className={ pathname.startsWith('/students') ? 'selected': ''}>Students ({ students.length })</Link>
        {
          !!mostPopular.id && (
        <Link to={`/schools/${mostPopular.id}`} className={ pathname.endsWith(mostPopular.id) ? 'selected': ''}>Most Popular { mostPopular.name } ({ mostPopular.enrollment })</Link>

          )
        }
        {
          !!topSchool.id && (
        <Link to={`/schools/${topSchool.id}`} className={ pathname.endsWith(topSchool.id) ? 'selected': ''}>Top School { topSchool.name } ({ topSchool.name })</Link>

          )
        }
      </nav>
    </header>
  );
};

export default connect((state)=> {
  return {
    ...state,
    mostPopular: mostPopular(state),
    topSchool: topSchool(state)

  }
})(_Nav);
