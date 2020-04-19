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
import Nav from './Nav';
import Schools from './Schools';
import School from './School';
import Students from './Students';
import StudentForm from './StudentForm';
import Home from './Home';
import Login from './Login';


class _Routes extends Component{
  componentDidMount(){
    this.props.loadData();
  }
  render(){
    return (
      <HashRouter>
        <Route component={ Nav } />
        {
          this.props.auth.id && <div>Logged In as { this.props.auth.email }</div>
        }
        {
          !this.props.auth.id && <Login /> 

        }
        <div id='content'>
          <Route component={ StudentForm } />
          <Route exact path='/' component={ Home } />
          <Route exact path='/schools' component={ Schools } />
          <Route exact path='/students' component={ Students } />
          <Route exact path='/schools/:id' component={ School } />
        </div>
      </HashRouter>
    );
  }
} 
const Routes = connect(state => state, (dispatch)=> {
  return {
    loadData: ()=> {
      dispatch(loadData());
    }
  };
})(_Routes);

export default ()=> {
  return (
    <Provider store={ store }>
      <Routes />
    </Provider>
  );
};
