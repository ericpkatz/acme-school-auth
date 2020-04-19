import React from 'react';
import { connect } from 'react-redux';
import { updateStudent } from '../store';

const _StudentDropDown = ({ students, excluded, school, updateStudent })=> {
  const onChange = (ev)=> {
    const student = students.find( student => student.id === ev.target.value );
    updateStudent({...student, schoolId: school.id });
  };
  return (
    <div>
      <select onChange={ onChange }>
          <option>-- Add Student --</option>
      {
        students.map( student => {
          if(excluded.map( exclude => exclude.id).includes(student.id)){
            return null;
          }
          return (
            <option value={ student.id } key={ student.id }>{ student.fullName }</option>
          );
        })
      }
      </select>
    </div>
  );
};

export default connect((state)=> state, (dispatch)=> {
  return {
    updateStudent: (student)=> dispatch(updateStudent(student))
  };
})(_StudentDropDown);
