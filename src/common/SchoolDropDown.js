import React from 'react';
import { connect } from 'react-redux';
import { updateStudent } from '../store';

const _SchoolDropDown = ({ schools, student, updateStudent })=> {
    const onChange = (ev)=> {
      updateStudent({...student, schoolId: ev.target.value });

    };
    if(!schools.length){
      return null;
    }
    return (
      <div>
        <select defaultValue={ student.schoolId } onChange={ onChange }>
          <option value=''>Not Enrolled</option>
          {
            schools.map( school => <option value={ school.id } key={ school.id }>{ school.name }</option>)
          }
        </select>
      </div>
    );
};

export default connect((state)=> {
  return {
    schools: state.schools
  };
}, (dispatch)=> {
  return {
    updateStudent: (student)=> dispatch(updateStudent(student)) 

  };
})(_SchoolDropDown);
