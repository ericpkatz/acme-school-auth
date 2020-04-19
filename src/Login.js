import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from './store';

class Login extends Component{
  constructor(){
    super();
    this.state = {
      email: '',
      password:''
    };
    this.login = this.login.bind(this);
  }
  login(ev){
    ev.preventDefault();
    this.props.login(this.state);

  }
  render(){
    const { login } = this;
    const { email, password } = this.state;
    return ( 
      <form onSubmit={ login }>
        <input value={ email } onChange={ ev => this.setState({ email: ev.target.value })}/>
        <input value={ password } onChange={ ev => this.setState({ password: ev.target.value })}/>
        <button>Login</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    login: (credentials)=> dispatch(login(credentials)) 
  };
};
export default connect(null, mapDispatchToProps)(Login);
