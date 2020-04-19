import React from 'react';
import { connect } from 'react-redux';
import SchoolDropDown from './SchoolDropDown';
import SchoolImageTile from './SchoolImageTile';
import { destroyStudent } from '../store';

const _StudentTile = ({ student, schoolMap, destroyStudent })=> {
  return (
    <div key={ student.id} className={ !student.schoolId ? 'unenrolled' : '' }>
      <h4>{ student.fullName}</h4>
      <SchoolImageTile schoolMap={ schoolMap } schoolId={ student.schoolId } />
      GPA: { student.GPA.toFixed(2) }
      <SchoolDropDown student={ student }/>
      <button className='destroy' onClick={ destroyStudent }>Destroy Student</button>
    </div>
  );
};


export default connect(null, (dispatch, { student })=> {
  return {
    destroyStudent: ()=> dispatch(destroyStudent(student))
  };
})(_StudentTile);
