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
import App from './App';

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);
