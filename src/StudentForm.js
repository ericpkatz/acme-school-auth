import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudent } from './store';

const InputField = ({ label, name, state, onChange })=> {
  return (
    <div>
      <label htmlFor={name}>{ label }</label>
      <input id={ name } name={ name } value={ state[name] } onChange={ onChange }/>
    </div>
  );
};

const InputSelect = ({ label, name, state, onChange, options })=> {
  return (
    <div>
      <label htmlFor={name}>{ label }</label>
      <select onChange={ onChange } value={ state[name] } name={ name }>
        <option value=''>-- Not Enrolled --</option>
        {
          options.map( school => <option value={ school.id } key={ school.id }>{ school.name }</option>)
        }
      </select>
    </div>
  );
};

const Error = ({ error })=> {
  if(!error){
    return null;
  }
  let errors = [ error.error ];
  if(error.error && error.error.errors){
    errors = [ ...error.error.errors ];
  }
  return (
    <div className='errors'>
      {
        errors.map( (error, idx) => <div key={ idx }>{ error.message || error.name }</div>)
      }
    </div>
  );
};

class _StudentForm extends React.Component{ 
  constructor(){
    super();
    const initialState = {
      firstName: '',
      lastName: '',
      GPA: '',
      email: '',
      schoolId: '',
      error: ''
    };
    this.state = initialState;
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this); 
  }
  async onSave(ev){
    ev.preventDefault();
    const student = {...this.state };
    delete student.error;
    try {
      await this.props.createStudent(student);
      const initialState = {
        firstName: '',
        lastName: '',
        GPA: '',
        email: '',
        schoolId: '',
        error: ''
      };
      this.setState(initialState);
    }
    catch(ex){
      this.setState({ error: ex.response.data });
    }
  }
  onChange(ev){
    this.setState({ [ev.target.name]: ev.target.value });
  }
  render(){
    const { onChange, state, onSave } = this;
    const { error } = this.state;
    return (
      <form onSubmit={ onSave }>
        <InputField name='firstName' state={ state } onChange={ onChange } label='First Name'/>
        <InputField name='lastName' state={ state } onChange={ onChange } label='Last Name'/>
        <InputField name='email' state={ state } onChange={ onChange } label='Email'/>
        <InputField name='GPA' state={ state } onChange={ onChange } label='GPA'/>
        <InputSelect name='schoolId' state={ state } onChange={ onChange } label='Enroll at' options={ this.props.schools }/>
        <button>Save</button>
        <Error error={ error } />
      </form>
    );
  }
}

export default connect((state)=> {
  return {
    ...state
  };
}, (dispatch)=> {
  return {
    createStudent: (student)=> dispatch(createStudent(student))
  }
})(_StudentForm);
